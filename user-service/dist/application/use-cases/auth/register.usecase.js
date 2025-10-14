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
exports.RegisterUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../../domain/entities/user.entity");
const user_tokens_1 = require("../../../domain/tokens/user.tokens");
const bcrypt = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
let RegisterUseCase = class RegisterUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
        this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
        this.REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';
    }
    async execute(dto) {
        const existingUser = await this.userRepository.findByEmail(dto.email);
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = user_entity_1.User.create(require('crypto').randomUUID(), dto.name, dto.email, dto.age, hashedPassword);
        const savedUser = await this.userRepository.create(user);
        const accessToken = this.generateAccessToken(savedUser);
        const refreshToken = this.generateRefreshToken(savedUser);
        return {
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: savedUser.id,
                    name: savedUser.name,
                    email: savedUser.email,
                    age: savedUser.age,
                },
                accessToken,
                refreshToken,
                expiresIn: 3600,
            },
        };
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
exports.RegisterUseCase = RegisterUseCase;
exports.RegisterUseCase = RegisterUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_tokens_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], RegisterUseCase);
//# sourceMappingURL=register.usecase.js.map