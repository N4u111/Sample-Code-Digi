import { Injectable, Logger } from '@nestjs/common';

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  keyGenerator?: (request: any) => string; // Custom key generator
  skipSuccessfulRequests?: boolean; // Skip counting successful requests
  skipFailedRequests?: boolean; // Skip counting failed requests
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

@Injectable()
export class RateLimitService {
  private readonly logger = new Logger(RateLimitService.name);
  private readonly store = new Map<string, { count: number; resetTime: number }>();

  // Default configurations for different endpoints
  private readonly defaultConfigs: Record<string, RateLimitConfig> = {
    login: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 5, // 5 attempts per 15 minutes
      keyGenerator: (request) => {
        // Rate limit by IP + email combination for login
        const ip = request.ip || request.connection?.remoteAddress || 'unknown';
        const email = request.body?.email || 'unknown';
        return `login:${ip}:${email}`;
      },
    },
    register: {
      windowMs: 60 * 60 * 1000, // 1 hour
      maxRequests: 3, // 3 registrations per hour per IP
      keyGenerator: (request) => {
        const ip = request.ip || request.connection?.remoteAddress || 'unknown';
        return `register:${ip}`;
      },
    },
    refresh: {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 10, // 10 refresh attempts per minute
      keyGenerator: (request) => {
        const ip = request.ip || request.connection?.remoteAddress || 'unknown';
        return `refresh:${ip}`;
      },
    },
    general: {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 100, // 100 requests per minute per IP
      keyGenerator: (request) => {
        const ip = request.ip || request.connection?.remoteAddress || 'unknown';
        return `general:${ip}`;
      },
    },
  };

  /**
   * Check if request is within rate limit
   */
  async checkRateLimit(
    request: any,
    configType: string = 'general',
    customConfig?: Partial<RateLimitConfig>,
  ): Promise<RateLimitInfo> {
    const config = { ...this.defaultConfigs[configType], ...customConfig };
    const key = config.keyGenerator!(request);
    const now = Date.now();
    const windowStart = now - config.windowMs;

    // Clean up expired entries
    this.cleanupExpiredEntries(windowStart);

    // Get or create rate limit entry
    let entry = this.store.get(key);
    if (!entry || entry.resetTime <= now) {
      entry = {
        count: 0,
        resetTime: now + config.windowMs,
      };
      this.store.set(key, entry);
    }

    // Increment counter
    entry.count++;

    const remaining = Math.max(0, config.maxRequests - entry.count);
    const retryAfter = entry.count > config.maxRequests ? 
      Math.ceil((entry.resetTime - now) / 1000) : undefined;

    const rateLimitInfo: RateLimitInfo = {
      limit: config.maxRequests,
      remaining,
      resetTime: entry.resetTime,
      retryAfter,
    };

    // Log rate limit check
    this.logger.log(
      `Rate limit check for ${configType}: ${key} - ${entry.count}/${config.maxRequests} requests`,
    );

    return rateLimitInfo;
  }

  /**
   * Check if request should be blocked
   */
  async isRateLimited(
    request: any,
    configType: string = 'general',
    customConfig?: Partial<RateLimitConfig>,
  ): Promise<boolean> {
    const rateLimitInfo = await this.checkRateLimit(request, configType, customConfig);
    const isLimited = rateLimitInfo.remaining < 0;
    this.logger.log(`Rate limit check: ${configType} - Remaining: ${rateLimitInfo.remaining}/${rateLimitInfo.limit} - Limited: ${isLimited}`);
    return isLimited;
  }

  /**
   * Get rate limit info without incrementing counter
   */
  async getRateLimitInfo(
    request: any,
    configType: string = 'general',
    customConfig?: Partial<RateLimitConfig>,
  ): Promise<RateLimitInfo> {
    const config = { ...this.defaultConfigs[configType], ...customConfig };
    const key = config.keyGenerator!(request);
    const now = Date.now();

    const entry = this.store.get(key);
    if (!entry || entry.resetTime <= now) {
      return {
        limit: config.maxRequests,
        remaining: config.maxRequests,
        resetTime: now + config.windowMs,
      };
    }

    return {
      limit: config.maxRequests,
      remaining: Math.max(0, config.maxRequests - entry.count),
      resetTime: entry.resetTime,
    };
  }

  /**
   * Reset rate limit for a specific key
   */
  resetRateLimit(request: any, configType: string = 'general'): void {
    const config = this.defaultConfigs[configType];
    const key = config.keyGenerator!(request);
    this.store.delete(key);
    this.logger.log(`Rate limit reset for ${configType}: ${key}`);
  }

  /**
   * Clean up expired entries to prevent memory leaks
   */
  private cleanupExpiredEntries(windowStart: number): void {
    for (const [key, entry] of this.store.entries()) {
      if (entry.resetTime <= windowStart) {
        this.store.delete(key);
      }
    }
  }

  /**
   * Get current store size (for monitoring)
   */
  getStoreSize(): number {
    return this.store.size;
  }

  /**
   * Clear all rate limit data
   */
  clearAll(): void {
    this.store.clear();
    this.logger.log('All rate limit data cleared');
  }
}
