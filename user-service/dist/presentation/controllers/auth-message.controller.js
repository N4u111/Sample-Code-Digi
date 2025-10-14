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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMessageController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const register_usecase_1 = require("../../application/use-cases/auth/register.usecase");
const login_usecase_1 = require("../../application/use-cases/auth/login.usecase");
const forgot_password_usecase_1 = require("../../application/use-cases/auth/forgot-password.usecase");
const reset_password_usecase_1 = require("../../application/use-cases/auth/reset-password.usecase");
const validate_token_usecase_1 = require("../../application/use-cases/auth/validate-token.usecase");
const refresh_token_usecase_1 = require("../../application/use-cases/auth/refresh-token.usecase");
const auth_dto_1 = require("../../application/dto/auth.dto");
let AuthMessageController = class AuthMessageController {
    constructor(registerUseCase, loginUseCase, forgotPasswordUseCase, resetPasswordUseCase, validateTokenUseCase, refreshTokenUseCase) {
        this.registerUseCase = registerUseCase;
        this.loginUseCase = loginUseCase;
        this.forgotPasswordUseCase = forgotPasswordUseCase;
        this.resetPasswordUseCase = resetPasswordUseCase;
        this.validateTokenUseCase = validateTokenUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
    }
    async register(data) {
        try {
            const result = await this.registerUseCase.execute(data);
            return result;
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async login(data) {
        try {
            const result = await this.loginUseCase.execute(data);
            return result;
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async forgotPassword(data) {
        try {
            const result = await this.forgotPasswordUseCase.execute(data);
            return result;
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async resetPassword(data) {
        try {
            const result = await this.resetPasswordUseCase.execute(data);
            return result;
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async validateToken(data) {
        try {
            const result = await this.validateTokenUseCase.execute(data);
            return result;
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async refreshToken(data) {
        try {
            const result = await this.refreshTokenUseCase.execute(data);
            return result;
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
};
exports.AuthMessageController = AuthMessageController;
__decorate([
    (0, microservices_1.MessagePattern)('auth.register'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthMessageController.prototype, "register", null);
__decorate([
    (0, microservices_1.MessagePattern)('auth.login'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthMessageController.prototype, "login", null);
__decorate([
    (0, microservices_1.MessagePattern)('auth.forgot-password'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthMessageController.prototype, "forgotPassword", null);
__decorate([
    (0, microservices_1.MessagePattern)('auth.reset-password'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthMessageController.prototype, "resetPassword", null);
__decorate([
    (0, microservices_1.MessagePattern)('auth.validate-token'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.TokenValidationDto]),
    __metadata("design:returntype", Promise)
], AuthMessageController.prototype, "validateToken", null);
__decorate([
    (0, microservices_1.MessagePattern)('auth.refresh-token'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthMessageController.prototype, "refreshToken", null);
exports.AuthMessageController = AuthMessageController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [register_usecase_1.RegisterUseCase,
        login_usecase_1.LoginUseCase,
        forgot_password_usecase_1.ForgotPasswordUseCase,
        reset_password_usecase_1.ResetPasswordUseCase,
        validate_token_usecase_1.ValidateTokenUseCase,
        refresh_token_usecase_1.RefreshTokenUseCase])
], AuthMessageController);
//# sourceMappingURL=auth-message.controller.js.map