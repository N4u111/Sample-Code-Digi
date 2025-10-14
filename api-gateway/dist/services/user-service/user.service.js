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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const microservice_service_1 = require("../../shared/common/services/microservice.service");
const microservice_config_1 = require("../../shared/common/config/microservice.config");
let UserService = UserService_1 = class UserService {
    constructor(microserviceService) {
        this.microserviceService = microserviceService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async createUser(createUserDto) {
        this.logger.log('Creating user via User Service');
        const response = await this.microserviceService.sendRequest(microservice_config_1.USER_SERVICE, 'user.create', createUserDto, 10000);
        if (!response.success) {
            throw new Error(`Failed to create user: ${response.message}`);
        }
        return response.data;
    }
    async getAllUsers() {
        this.logger.log('Getting all users via User Service');
        const response = await this.microserviceService.sendRequest(microservice_config_1.USER_SERVICE, 'user.findAll', {}, 10000);
        if (!response.success) {
            throw new Error(`Failed to get users: ${response.message}`);
        }
        return response.data;
    }
    async getUserById(id) {
        this.logger.log(`Getting user by ID: ${id} via User Service`);
        const response = await this.microserviceService.sendRequest(microservice_config_1.USER_SERVICE, 'user.findById', { id }, 10000);
        if (!response.success) {
            throw new Error(`Failed to get user: ${response.message}`);
        }
        return response.data;
    }
    async updateUser(id, updateUserDto) {
        this.logger.log(`Updating user ID: ${id} via User Service`);
        const response = await this.microserviceService.sendRequest(microservice_config_1.USER_SERVICE, 'user.update', { id, updateData: updateUserDto }, 10000);
        if (!response.success) {
            throw new Error(`Failed to update user: ${response.message}`);
        }
        return response.data;
    }
    async deleteUser(id) {
        this.logger.log(`Deleting user ID: ${id} via User Service`);
        const response = await this.microserviceService.sendRequest(microservice_config_1.USER_SERVICE, 'user.delete', { id }, 10000);
        if (!response.success) {
            throw new Error(`Failed to delete user: ${response.message}`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [microservice_service_1.MicroserviceService])
], UserService);
//# sourceMappingURL=user.service.js.map