"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RateLimitGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitGuard = void 0;
const common_1 = require("@nestjs/common");
const rate_limit_service_1 = require("../services/rate-limit.service");
const rate_limit_decorator_1 = require("../decorators/rate-limit.decorator");
let RateLimitGuard = RateLimitGuard_1 = class RateLimitGuard {
    constructor(rateLimitService) {
        this.rateLimitService = rateLimitService;
        this.logger = new common_1.Logger(RateLimitGuard_1.name);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const options = this.getRateLimitOptions(context);
        this.logger.log(`Rate limit check for ${options.configType || 'general'} - IP: ${request.ip}`);
        try {
            const isLimited = await this.rateLimitService.isRateLimited(request, options.configType, options.customConfig);
            if (isLimited) {
                const rateLimitInfo = await this.rateLimitService.getRateLimitInfo(request, options.configType, options.customConfig);
                this.setRateLimitHeaders(response, rateLimitInfo);
                this.logger.warn(`Rate limit exceeded for ${options.configType || 'general'}: ${request.ip}`);
                throw new common_1.HttpException({
                    success: false,
                    message: 'Too many requests. Please try again later.',
                    error: 'RateLimitExceeded',
                    statusCode: 429,
                    retryAfter: rateLimitInfo.retryAfter,
                }, common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
            const rateLimitInfo = await this.rateLimitService.getRateLimitInfo(request, options.configType, options.customConfig);
            this.setRateLimitHeaders(response, rateLimitInfo);
            return true;
        }
        catch (error) {
            if (error instanceof common_1.HttpException && error.getStatus() === common_1.HttpStatus.TOO_MANY_REQUESTS) {
                throw error;
            }
            this.logger.error('Rate limit check failed:', error.message);
            return true;
        }
    }
    getRateLimitOptions(context) {
        const handler = context.getHandler();
        const classRef = context.getClass();
        const rateLimitMetadata = Reflect.getMetadata(rate_limit_decorator_1.RATE_LIMIT_KEY, handler) ||
            Reflect.getMetadata(rate_limit_decorator_1.RATE_LIMIT_KEY, classRef);
        return rateLimitMetadata || { configType: 'general' };
    }
    setRateLimitHeaders(response, rateLimitInfo) {
        response.setHeader('X-RateLimit-Limit', rateLimitInfo.limit);
        response.setHeader('X-RateLimit-Remaining', rateLimitInfo.remaining);
        response.setHeader('X-RateLimit-Reset', new Date(rateLimitInfo.resetTime).toISOString());
        if (rateLimitInfo.retryAfter) {
            response.setHeader('Retry-After', rateLimitInfo.retryAfter);
        }
    }
};
exports.RateLimitGuard = RateLimitGuard;
exports.RateLimitGuard = RateLimitGuard = RateLimitGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rate_limit_service_1.RateLimitService])
], RateLimitGuard);
//# sourceMappingURL=rate-limit.guard.js.map