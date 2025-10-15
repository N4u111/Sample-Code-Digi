"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const register_usecase_1 = require("./register.usecase");
const login_usecase_1 = require("./login.usecase");
const forgot_password_usecase_1 = require("./forgot-password.usecase");
const reset_password_usecase_1 = require("./reset-password.usecase");
const validate_token_usecase_1 = require("./validate-token.usecase");
const refresh_token_usecase_1 = require("./refresh-token.usecase");
const infrastructure_module_1 = require("../../../infrastructure/infrastructure.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule],
        providers: [
            register_usecase_1.RegisterUseCase,
            login_usecase_1.LoginUseCase,
            forgot_password_usecase_1.ForgotPasswordUseCase,
            reset_password_usecase_1.ResetPasswordUseCase,
            validate_token_usecase_1.ValidateTokenUseCase,
            refresh_token_usecase_1.RefreshTokenUseCase,
        ],
        exports: [
            register_usecase_1.RegisterUseCase,
            login_usecase_1.LoginUseCase,
            forgot_password_usecase_1.ForgotPasswordUseCase,
            reset_password_usecase_1.ResetPasswordUseCase,
            validate_token_usecase_1.ValidateTokenUseCase,
            refresh_token_usecase_1.RefreshTokenUseCase,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map