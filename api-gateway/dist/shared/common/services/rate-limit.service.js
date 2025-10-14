"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RateLimitService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitService = void 0;
const common_1 = require("@nestjs/common");
let RateLimitService = RateLimitService_1 = class RateLimitService {
    constructor() {
        this.logger = new common_1.Logger(RateLimitService_1.name);
        this.store = new Map();
        this.defaultConfigs = {
            login: {
                windowMs: 15 * 60 * 1000,
                maxRequests: 5,
                keyGenerator: (request) => {
                    const ip = request.ip || request.connection?.remoteAddress || 'unknown';
                    const email = request.body?.email || 'unknown';
                    return `login:${ip}:${email}`;
                },
            },
            register: {
                windowMs: 60 * 60 * 1000,
                maxRequests: 3,
                keyGenerator: (request) => {
                    const ip = request.ip || request.connection?.remoteAddress || 'unknown';
                    return `register:${ip}`;
                },
            },
            refresh: {
                windowMs: 60 * 1000,
                maxRequests: 10,
                keyGenerator: (request) => {
                    const ip = request.ip || request.connection?.remoteAddress || 'unknown';
                    return `refresh:${ip}`;
                },
            },
            general: {
                windowMs: 60 * 1000,
                maxRequests: 100,
                keyGenerator: (request) => {
                    const ip = request.ip || request.connection?.remoteAddress || 'unknown';
                    return `general:${ip}`;
                },
            },
        };
    }
    async checkRateLimit(request, configType = 'general', customConfig) {
        const config = { ...this.defaultConfigs[configType], ...customConfig };
        const key = config.keyGenerator(request);
        const now = Date.now();
        const windowStart = now - config.windowMs;
        this.cleanupExpiredEntries(windowStart);
        let entry = this.store.get(key);
        if (!entry || entry.resetTime <= now) {
            entry = {
                count: 0,
                resetTime: now + config.windowMs,
            };
            this.store.set(key, entry);
        }
        entry.count++;
        const remaining = Math.max(0, config.maxRequests - entry.count);
        const retryAfter = entry.count > config.maxRequests ?
            Math.ceil((entry.resetTime - now) / 1000) : undefined;
        const rateLimitInfo = {
            limit: config.maxRequests,
            remaining,
            resetTime: entry.resetTime,
            retryAfter,
        };
        this.logger.log(`Rate limit check for ${configType}: ${key} - ${entry.count}/${config.maxRequests} requests`);
        return rateLimitInfo;
    }
    async isRateLimited(request, configType = 'general', customConfig) {
        const rateLimitInfo = await this.checkRateLimit(request, configType, customConfig);
        const isLimited = rateLimitInfo.remaining < 0;
        this.logger.log(`Rate limit check: ${configType} - Remaining: ${rateLimitInfo.remaining}/${rateLimitInfo.limit} - Limited: ${isLimited}`);
        return isLimited;
    }
    async getRateLimitInfo(request, configType = 'general', customConfig) {
        const config = { ...this.defaultConfigs[configType], ...customConfig };
        const key = config.keyGenerator(request);
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
    resetRateLimit(request, configType = 'general') {
        const config = this.defaultConfigs[configType];
        const key = config.keyGenerator(request);
        this.store.delete(key);
        this.logger.log(`Rate limit reset for ${configType}: ${key}`);
    }
    cleanupExpiredEntries(windowStart) {
        for (const [key, entry] of this.store.entries()) {
            if (entry.resetTime <= windowStart) {
                this.store.delete(key);
            }
        }
    }
    getStoreSize() {
        return this.store.size;
    }
    clearAll() {
        this.store.clear();
        this.logger.log('All rate limit data cleared');
    }
};
exports.RateLimitService = RateLimitService;
exports.RateLimitService = RateLimitService = RateLimitService_1 = __decorate([
    (0, common_1.Injectable)()
], RateLimitService);
//# sourceMappingURL=rate-limit.service.js.map