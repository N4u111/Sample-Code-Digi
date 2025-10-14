"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./database/prisma.service");
const prisma_user_repository_1 = require("./repositories/prisma-user.repository");
const user_tokens_1 = require("../domain/tokens/user.tokens");
let InfrastructureModule = class InfrastructureModule {
};
exports.InfrastructureModule = InfrastructureModule;
exports.InfrastructureModule = InfrastructureModule = __decorate([
    (0, common_1.Module)({
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: user_tokens_1.USER_REPOSITORY,
                useClass: prisma_user_repository_1.PrismaUserRepository,
            },
        ],
        exports: [prisma_service_1.PrismaService, user_tokens_1.USER_REPOSITORY],
    })
], InfrastructureModule);
//# sourceMappingURL=infrastructure.module.js.map