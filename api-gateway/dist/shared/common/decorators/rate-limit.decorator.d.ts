import { RateLimitOptions } from '../guards/rate-limit.guard';
export declare const RATE_LIMIT_KEY = "rate-limit";
export declare const RateLimit: (options: RateLimitOptions) => import("@nestjs/common").CustomDecorator<string>;
