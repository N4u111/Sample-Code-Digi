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
exports.UserMessageController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const create_user_usecase_1 = require("../../application/use-cases/user/create-user.usecase");
const get_user_by_id_usecase_1 = require("../../application/use-cases/user/get-user-by-id.usecase");
const get_all_users_usecase_1 = require("../../application/use-cases/user/get-all-users.usecase");
const update_user_usecase_1 = require("../../application/use-cases/user/update-user.usecase");
const delete_user_usecase_1 = require("../../application/use-cases/user/delete-user.usecase");
const user_dto_1 = require("../../application/dto/user.dto");
let UserMessageController = class UserMessageController {
    constructor(createUserUseCase, getUserByIdUseCase, getAllUsersUseCase, updateUserUseCase, deleteUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.getUserByIdUseCase = getUserByIdUseCase;
        this.getAllUsersUseCase = getAllUsersUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async create(data) {
        try {
            const user = await this.createUserUseCase.execute(data);
            return {
                success: true,
                message: 'User created successfully',
                data: user.toJSON(),
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async findAll() {
        try {
            const users = await this.getAllUsersUseCase.execute();
            return {
                success: true,
                message: 'Users retrieved successfully',
                data: users.map(user => user.toJSON()),
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async findById(data) {
        try {
            const user = await this.getUserByIdUseCase.execute(data.id);
            return {
                success: true,
                message: 'User retrieved successfully',
                data: user.toJSON(),
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async update(data) {
        try {
            const user = await this.updateUserUseCase.execute(data.id, data.updateData);
            return {
                success: true,
                message: 'User updated successfully',
                data: user.toJSON(),
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
    async delete(data) {
        try {
            await this.deleteUserUseCase.execute(data.id);
            return {
                success: true,
                message: 'User deleted successfully',
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
};
exports.UserMessageController = UserMessageController;
__decorate([
    (0, microservices_1.MessagePattern)('user.create'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserMessageController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.findAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserMessageController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.findById'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMessageController.prototype, "findById", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.update'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMessageController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.delete'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserMessageController.prototype, "delete", null);
exports.UserMessageController = UserMessageController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [create_user_usecase_1.CreateUserUseCase,
        get_user_by_id_usecase_1.GetUserByIdUseCase,
        get_all_users_usecase_1.GetAllUsersUseCase,
        update_user_usecase_1.UpdateUserUseCase,
        delete_user_usecase_1.DeleteUserUseCase])
], UserMessageController);
//# sourceMappingURL=user-message.controller.js.map