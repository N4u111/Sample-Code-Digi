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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const microservice_service_1 = require("../../../shared/common/services/microservice.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(microserviceService) {
        this.microserviceService = microserviceService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateToken(validateTokenDto) {
        this.logger.log('Validating token with auth microservice');
        try {
            const response = await this.microserviceService.sendRequest('AUTH_SERVICE', 'auth.validateToken', validateTokenDto, 5000);
            if (!response.success) {
                this.logger.warn(`Token validation failed: ${response.message}`);
                return {
                    success: false,
                    message: response.message || 'Token validation failed',
                    data: undefined,
                };
            }
            return {
                success: true,
                message: 'Token validated successfully',
                data: response.data,
            };
        }
        catch (error) {
            this.logger.error('Error validating token:', error.message);
            return {
                success: false,
                message: 'Token validation error',
                data: undefined,
            };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [microservice_service_1.MicroserviceService])
], AuthService);
//# sourceMappingURL=auth.service.js.map