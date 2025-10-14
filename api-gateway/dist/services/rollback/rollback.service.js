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
var RollbackService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollbackService = void 0;
const common_1 = require("@nestjs/common");
const microservice_service_1 = require("../../shared/common/services/microservice.service");
let RollbackService = RollbackService_1 = class RollbackService {
    constructor(microserviceService) {
        this.microserviceService = microserviceService;
        this.logger = new common_1.Logger(RollbackService_1.name);
    }
    async restartUserService() {
        try {
            this.logger.log('🔄 Sending restart command to user service...');
            const response = await this.microserviceService.sendRequest('USER_SERVICE', 'user.service.restart', {});
            this.logger.log('✅ User service restart command sent successfully');
            return response;
        }
        catch (error) {
            this.logger.error(`❌ Failed to restart user service: ${error.message}`);
            return {
                success: false,
                message: 'Failed to restart user service',
                error: error.message
            };
        }
    }
    async checkUserServiceHealth() {
        try {
            this.logger.log('🏥 Checking user service health...');
            const response = await this.microserviceService.sendRequest('USER_SERVICE', 'user.service.health', {});
            this.logger.log('✅ User service health check completed');
            return response;
        }
        catch (error) {
            this.logger.error(`❌ User service health check failed: ${error.message}`);
            return {
                success: false,
                message: 'User service health check failed',
                error: error.message
            };
        }
    }
    async getUserServiceStatus() {
        try {
            this.logger.log('📊 Getting user service status...');
            const response = await this.microserviceService.sendRequest('USER_SERVICE', 'user.service.status', {});
            this.logger.log('✅ User service status retrieved');
            return response;
        }
        catch (error) {
            this.logger.error(`❌ Failed to get user service status: ${error.message}`);
            return {
                success: false,
                message: 'Failed to get user service status',
                error: error.message
            };
        }
    }
    async rollbackUserOperation(data) {
        try {
            this.logger.log('🔄 Rolling back user operation...');
            const response = await this.microserviceService.sendRequest('USER_SERVICE', 'user.rollback', data);
            this.logger.log('✅ User operation rollback completed');
            return response;
        }
        catch (error) {
            this.logger.error(`❌ User operation rollback failed: ${error.message}`);
            return {
                success: false,
                message: 'User operation rollback failed',
                error: error.message
            };
        }
    }
    async syncDataWithUserService(data) {
        try {
            this.logger.log('🔄 Syncing data with user service...');
            const response = await this.microserviceService.sendRequest('USER_SERVICE', 'user.sync', data);
            this.logger.log('✅ Data sync with user service completed');
            return response;
        }
        catch (error) {
            this.logger.error(`❌ Data sync with user service failed: ${error.message}`);
            return {
                success: false,
                message: 'Data sync with user service failed',
                error: error.message
            };
        }
    }
};
exports.RollbackService = RollbackService;
exports.RollbackService = RollbackService = RollbackService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [microservice_service_1.MicroserviceService])
], RollbackService);
//# sourceMappingURL=rollback.service.js.map