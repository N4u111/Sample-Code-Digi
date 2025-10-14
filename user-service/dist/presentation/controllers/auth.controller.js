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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const register_usecase_1 = require("../../application/use-cases/auth/register.usecase");
const login_usecase_1 = require("../../application/use-cases/auth/login.usecase");
const forgot_password_usecase_1 = require("../../application/use-cases/auth/forgot-password.usecase");
const reset_password_usecase_1 = require("../../application/use-cases/auth/reset-password.usecase");
const validate_token_usecase_1 = require("../../application/use-cases/auth/validate-token.usecase");
const refresh_token_usecase_1 = require("../../application/use-cases/auth/refresh-token.usecase");
const auth_dto_1 = require("../../application/dto/auth.dto");
let AuthController = class AuthController {
    constructor(registerUseCase, loginUseCase, forgotPasswordUseCase, resetPasswordUseCase, validateTokenUseCase, refreshTokenUseCase) {
        this.registerUseCase = registerUseCase;
        this.loginUseCase = loginUseCase;
        this.forgotPasswordUseCase = forgotPasswordUseCase;
        this.resetPasswordUseCase = resetPasswordUseCase;
        this.validateTokenUseCase = validateTokenUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
    }
    async register(registerDto) {
        return await this.registerUseCase.execute(registerDto);
    }
    async login(loginDto) {
        return await this.loginUseCase.execute(loginDto);
    }
    async forgotPassword(forgotPasswordDto) {
        return await this.forgotPasswordUseCase.execute(forgotPasswordDto);
    }
    async resetPassword(resetPasswordDto) {
        return await this.resetPasswordUseCase.execute(resetPasswordDto);
    }
    async validateToken(tokenValidationDto) {
        return await this.validateTokenUseCase.execute(tokenValidationDto);
    }
    async refreshToken(refreshTokenDto) {
        return await this.refreshTokenUseCase.execute(refreshTokenDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('validate-token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.TokenValidationDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateToken", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [register_usecase_1.RegisterUseCase,
        login_usecase_1.LoginUseCase,
        forgot_password_usecase_1.ForgotPasswordUseCase,
        reset_password_usecase_1.ResetPasswordUseCase,
        validate_token_usecase_1.ValidateTokenUseCase,
        refresh_token_usecase_1.RefreshTokenUseCase])
], AuthController);
//# sourceMappingURL=auth.controller.js.map