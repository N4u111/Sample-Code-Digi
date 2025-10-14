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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_usecase_1 = require("../../application/use-cases/user/create-user.usecase");
const get_user_by_id_usecase_1 = require("../../application/use-cases/user/get-user-by-id.usecase");
const get_all_users_usecase_1 = require("../../application/use-cases/user/get-all-users.usecase");
const update_user_usecase_1 = require("../../application/use-cases/user/update-user.usecase");
const delete_user_usecase_1 = require("../../application/use-cases/user/delete-user.usecase");
const user_dto_1 = require("../../application/dto/user.dto");
let UserController = class UserController {
    constructor(createUserUseCase, getUserByIdUseCase, getAllUsersUseCase, updateUserUseCase, deleteUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.getUserByIdUseCase = getUserByIdUseCase;
        this.getAllUsersUseCase = getAllUsersUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async create(createUserDto) {
        const user = await this.createUserUseCase.execute(createUserDto);
        return user.toJSON();
    }
    async findAll() {
        const users = await this.getAllUsersUseCase.execute();
        return users.map(user => user.toJSON());
    }
    async findOne(id) {
        const user = await this.getUserByIdUseCase.execute(id);
        return user.toJSON();
    }
    async update(id, updateUserDto) {
        const user = await this.updateUserUseCase.execute(id, updateUserDto);
        return user.toJSON();
    }
    async remove(id) {
        await this.deleteUserUseCase.execute(id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [create_user_usecase_1.CreateUserUseCase,
        get_user_by_id_usecase_1.GetUserByIdUseCase,
        get_all_users_usecase_1.GetAllUsersUseCase,
        update_user_usecase_1.UpdateUserUseCase,
        delete_user_usecase_1.DeleteUserUseCase])
], UserController);
//# sourceMappingURL=user.controller.js.map