import { SetMetadata } from '@nestjs/common';
import { RateLimitOptions } from '../guards/rate-limit.guard';

export const RATE_LIMIT_KEY = 'rate-limit';

/**
 * Rate Limit Decorator
 * 
 * @param options Rate limit configuration options
 * 
 * @example
 * ```typescript
 * @Post('login')
 * @RateLimit({ configType: 'login' })
 * async login(@Body() dto: LoginDto) {
 *   return this.authService.login(dto);
 * }
 * 
 * @Post('register')
 * @RateLimit({ 
 *   configType: 'register',
 *   customConfig: { maxRequests: 2, windowMs: 30 * 60 * 1000 }
 * })
 * async register(@Body() dto: RegisterDto) {
 *   return this.authService.register(dto);
 * }
 * ```
 */
export const RateLimit = (options: RateLimitOptions) => SetMetadata(RATE_LIMIT_KEY, options);
