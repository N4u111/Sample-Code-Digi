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
exports.UpdateUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_tokens_1 = require("../../../domain/tokens/user.tokens");
const bcrypt = require("bcrypt");
let UpdateUserUseCase = class UpdateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id, dto) {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        if (dto.email && dto.email !== existingUser.email) {
            const emailExists = await this.userRepository.existsByEmail(dto.email);
            if (emailExists) {
                throw new common_1.ConflictException('User with this email already exists');
            }
        }
        let updatedUser = existingUser;
        if (dto.name) {
            updatedUser = updatedUser.updateName(dto.name);
        }
        if (dto.email) {
            updatedUser = updatedUser.updateEmail(dto.email);
        }
        if (dto.age) {
            updatedUser = updatedUser.updateAge(dto.age);
        }
        if (dto.password) {
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            updatedUser = updatedUser.updatePassword(hashedPassword);
        }
        return await this.userRepository.update(id, updatedUser);
    }
};
exports.UpdateUserUseCase = UpdateUserUseCase;
exports.UpdateUserUseCase = UpdateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_tokens_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UpdateUserUseCase);
//# sourceMappingURL=update-user.usecase.js.map