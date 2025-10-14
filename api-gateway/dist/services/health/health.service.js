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
var HealthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
const common_1 = require("@nestjs/common");
const microservice_service_1 = require("../../shared/common/services/microservice.service");
let HealthService = HealthService_1 = class HealthService {
    constructor(microserviceService) {
        this.microserviceService = microserviceService;
        this.logger = new common_1.Logger(HealthService_1.name);
    }
    async checkMicroservices() {
        const results = {
            apiGateway: {
                status: 'ok',
                timestamp: new Date().toISOString(),
            },
            authService: await this.checkService('AUTH_SERVICE', 'auth.health'),
            userService: await this.checkService('USER_SERVICE', 'user.health'),
        };
        this.logger.log('Health check completed', results);
        return results;
    }
    async checkService(serviceName, pattern) {
        try {
            const response = await this.microserviceService.sendRequest(serviceName, pattern, {}, 2000);
            return {
                success: response.success,
                message: response.message,
                data: response.data,
            };
        }
        catch (error) {
            this.logger.error(`Health check failed for ${serviceName}: ${error.message}`);
            return {
                success: false,
                message: `Service ${serviceName} is not responding`,
                error: error.message,
            };
        }
    }
};
exports.HealthService = HealthService;
exports.HealthService = HealthService = HealthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [microservice_service_1.MicroserviceService])
], HealthService);
//# sourceMappingURL=health.service.js.map