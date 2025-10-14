export interface RateLimitConfig {
    windowMs: number;
    maxRequests: number;
    keyGenerator?: (request: any) => string;
    skipSuccessfulRequests?: boolean;
    skipFailedRequests?: boolean;
}
export interface RateLimitInfo {
    limit: number;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
}
export declare class RateLimitService {
    private readonly logger;
    private readonly store;
    private readonly defaultConfigs;
    checkRateLimit(request: any, configType?: string, customConfig?: Partial<RateLimitConfig>): Promise<RateLimitInfo>;
    isRateLimited(request: any, configType?: string, customConfig?: Partial<RateLimitConfig>): Promise<boolean>;
    getRateLimitInfo(request: any, configType?: string, customConfig?: Partial<RateLimitConfig>): Promise<RateLimitInfo>;
    resetRateLimit(request: any, configType?: string): void;
    private cleanupExpiredEntries;
    getStoreSize(): number;
    clearAll(): void;
}
