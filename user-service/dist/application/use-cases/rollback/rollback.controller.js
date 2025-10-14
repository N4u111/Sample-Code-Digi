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
exports.RollbackController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rollback_service_1 = require("./rollback.service");
let RollbackController = class RollbackController {
    constructor(rollbackService) {
        this.rollbackService = rollbackService;
    }
    async restartService(data) {
        return this.rollbackService.handleRollbackCommand('restart', data);
    }
    async healthCheck(data) {
        return this.rollbackService.handleRollbackCommand('health', data);
    }
    async getStatus(data) {
        return this.rollbackService.handleRollbackCommand('status', data);
    }
    async rollbackOperation(data) {
        return this.rollbackService.handleRollbackCommand('rollback', data);
    }
    async syncData(data) {
        return this.rollbackService.handleRollbackCommand('sync', data);
    }
};
exports.RollbackController = RollbackController;
__decorate([
    (0, microservices_1.MessagePattern)('user.service.restart'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RollbackController.prototype, "restartService", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.service.health'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RollbackController.prototype, "healthCheck", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.service.status'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RollbackController.prototype, "getStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.rollback'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RollbackController.prototype, "rollbackOperation", null);
__decorate([
    (0, microservices_1.MessagePattern)('user.sync'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RollbackController.prototype, "syncData", null);
exports.RollbackController = RollbackController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [rollback_service_1.RollbackService])
], RollbackController);
//# sourceMappingURL=rollback.controller.js.map