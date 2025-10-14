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
exports.RefreshTokenUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_tokens_1 = require("../../../domain/tokens/user.tokens");
const jsonwebtoken_1 = require("jsonwebtoken");
let RefreshTokenUseCase = class RefreshTokenUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
        this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
        this.REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';
    }
    async execute(dto) {
        try {
            const decoded = jsonwebtoken_1.default.verify(dto.refreshToken, this.JWT_SECRET);
            if (decoded.type !== 'refresh') {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const user = await this.userRepository.findById(decoded.userId);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const accessToken = this.generateAccessToken(user);
            const refreshToken = this.generateRefreshToken(user);
            return {
                success: true,
                message: 'Token refreshed successfully',
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        age: user.age,
                    },
                    accessToken,
                    refreshToken,
                    expiresIn: 3600,
                },
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    generateAccessToken(user) {
        return jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email,
            type: 'access',
        }, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRES_IN });
    }
    generateRefreshToken(user) {
        return jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email,
            type: 'refresh',
        }, this.JWT_SECRET, { expiresIn: this.REFRESH_TOKEN_EXPIRES_IN });
    }
};
exports.RefreshTokenUseCase = RefreshTokenUseCase;
exports.RefreshTokenUseCase = RefreshTokenUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_tokens_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], RefreshTokenUseCase);
//# sourceMappingURL=refresh-token.usecase.js.map