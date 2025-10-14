import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RateLimitService } from '../services/rate-limit.service';
import { RATE_LIMIT_KEY } from '../decorators/rate-limit.decorator';

export interface RateLimitOptions {
  configType?: string;
  customConfig?: {
    windowMs?: number;
    maxRequests?: number;
    keyGenerator?: (request: any) => string;
  };_
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly logger = new Logger(RateLimitGuard.name);

  constructor(private readonly rateLimitService: RateLimitService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    // Get rate limit options from metadata or use defaults
    const options = this.getRateLimitOptions(context);
    
    this.logger.log(`Rate limit check for ${options.configType || 'general'} - IP: ${request.ip}`);

    try {
      // Check if request is rate limited
      const isLimited = await this.rateLimitService.isRateLimited(
        request,
        options.configType,
        options.customConfig,
      );

      if (isLimited) {
        // Get rate limit info for headers
        const rateLimitInfo = await this.rateLimitService.getRateLimitInfo(
          request,
          options.configType,
          options.customConfig,
        );

        // Set rate limit headers
        this.setRateLimitHeaders(response, rateLimitInfo);

        // Log rate limit violation
        this.logger.warn(
          `Rate limit exceeded for ${options.configType || 'general'}: ${request.ip}`,
        );

        throw new HttpException({
          success: false,
          message: 'Too many requests. Please try again later.',
          error: 'RateLimitExceeded',
          statusCode: 429,
          retryAfter: rateLimitInfo.retryAfter,
        }, HttpStatus.TOO_MANY_REQUESTS);
      }

      // Get rate limit info for headers
      const rateLimitInfo = await this.rateLimitService.getRateLimitInfo(
        request,
        options.configType,
        options.customConfig,
      );

      // Set rate limit headers
      this.setRateLimitHeaders(response, rateLimitInfo);

      return true;
    } catch (error) {
      if (error instanceof HttpException && error.getStatus() === HttpStatus.TOO_MANY_REQUESTS) {
        throw error;
      }

      this.logger.error('Rate limit check failed:', error.message);
      // Allow request to proceed if rate limit service fails
      return true;
    }
  }

  private getRateLimitOptions(context: ExecutionContext): RateLimitOptions {
    // Try to get options from custom metadata
    const handler = context.getHandler();
    const classRef = context.getClass();
    
    // Check for @RateLimit decorator metadata
    const rateLimitMetadata = Reflect.getMetadata(RATE_LIMIT_KEY, handler) || 
                             Reflect.getMetadata(RATE_LIMIT_KEY, classRef);

    return rateLimitMetadata || { configType: 'general' };
  }

  private setRateLimitHeaders(response: Response, rateLimitInfo: any): void {
    response.setHeader('X-RateLimit-Limit', rateLimitInfo.limit);
    response.setHeader('X-RateLimit-Remaining', rateLimitInfo.remaining);
    response.setHeader('X-RateLimit-Reset', new Date(rateLimitInfo.resetTime).toISOString());
    
    if (rateLimitInfo.retryAfter) {
      response.setHeader('Retry-After', rateLimitInfo.retryAfter);
    }
  }
}
