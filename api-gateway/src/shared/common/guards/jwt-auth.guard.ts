import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../../../services/auth-service/auth/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logger.warn('No token provided in request');
      throw new UnauthorizedException('Access token is required');
    }

    try {
      // Call auth-service to validate token
      this.logger.log('Validating token with auth-service');
      const result = await this.authService.validateToken({ token });

      // Check if result has data (successful response)
      if (!result || !result.data) {
        this.logger.warn('Token validation failed - no data returned');
        throw new UnauthorizedException('Invalid or expired token');
      }

      // Extract user from response data
      const user = result.data as any;
      
      // Inject user info into request object
      request['user'] = {
        userId: user.id,
        email: user.email,
        name: user.name,
      };
      
      this.logger.log(`Token validated successfully for user: ${user.email}`);

      return true;
    } catch (error) {
      this.logger.error('Token validation error:', error.message);
      
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      throw new UnauthorizedException('Token validation failed');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
