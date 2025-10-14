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
exports.ForgotPasswordUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_tokens_1 = require("../../../domain/tokens/user.tokens");
const crypto = require("crypto");
let ForgotPasswordUseCase = class ForgotPasswordUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(dto) {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) {
            return {
                success: true,
                message: 'If the email exists, a password reset link has been sent',
            };
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000);
        console.log(`Password reset token for ${dto.email}: ${resetToken}`);
        console.log(`Token expires at: ${resetTokenExpiry}`);
        return {
            success: true,
            message: 'If the email exists, a password reset link has been sent',
        };
    }
};
exports.ForgotPasswordUseCase = ForgotPasswordUseCase;
exports.ForgotPasswordUseCase = ForgotPasswordUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_tokens_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ForgotPasswordUseCase);
//# sourceMappingURL=forgot-password.usecase.js.map