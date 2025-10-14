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
const rollback_service_1 = require("./rollback.service");
let RollbackController = class RollbackController {
    constructor(rollbackService) {
        this.rollbackService = rollbackService;
    }
    async restartUserService() {
        return this.rollbackService.restartUserService();
    }
    async checkUserServiceHealth() {
        return this.rollbackService.checkUserServiceHealth();
    }
    async getUserServiceStatus() {
        return this.rollbackService.getUserServiceStatus();
    }
    async rollbackUserOperation(data) {
        return this.rollbackService.rollbackUserOperation(data);
    }
    async syncDataWithUserService(data) {
        return this.rollbackService.syncDataWithUserService(data);
    }
};
exports.RollbackController = RollbackController;
__decorate([
    (0, common_1.Post)('user-service/restart'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RollbackController.prototype, "restartUserService", null);
__decorate([
    (0, common_1.Get)('user-service/health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RollbackController.prototype, "checkUserServiceHealth", null);
__decorate([
    (0, common_1.Get)('user-service/status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RollbackController.prototype, "getUserServiceStatus", null);
__decorate([
    (0, common_1.Post)('user-service/rollback-operation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RollbackController.prototype, "rollbackUserOperation", null);
__decorate([
    (0, common_1.Post)('user-service/sync-data'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RollbackController.prototype, "syncDataWithUserService", null);
exports.RollbackController = RollbackController = __decorate([
    (0, common_1.Controller)('rollback'),
    __metadata("design:paramtypes", [rollback_service_1.RollbackService])
], RollbackController);
//# sourceMappingURL=rollback.controller.js.map