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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const microservice_service_1 = require("../../../shared/common/services/microservice.service");
const microservice_config_1 = require("../../../shared/common/config/microservice.config");
let AuthService = class AuthService {
    constructor(microserviceService) {
        this.microserviceService = microserviceService;
    }
    async validateToken(tokenData) {
        try {
            const response = await this.microserviceService.sendRequest(microservice_config_1.USER_SERVICE, 'auth.validate-token', tokenData, 5000);
            if (!response.success) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            return response;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token validation failed');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [microservice_service_1.MicroserviceService])
], AuthService);
//# sourceMappingURL=auth.service.js.map