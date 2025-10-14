import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RateLimitService } from '../services/rate-limit.service';
export interface RateLimitOptions {
    configType?: string;
    customConfig?: {
        windowMs?: number;
        maxRequests?: number;
        keyGenerator?: (request: any) => string;
    };
    _: any;
    skipSuccessfulRequests?: boolean;
    skipFailedRequests?: boolean;
}
export declare class RateLimitGuard implements CanActivate {
    private readonly rateLimitService;
    private readonly logger;
    constructor(rateLimitService: RateLimitService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private getRateLimitOptions;
    private setRateLimitHeaders;
}
