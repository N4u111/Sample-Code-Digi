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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const user_entity_1 = require("../../domain/entities/user.entity");
let PrismaUserRepository = class PrismaUserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(user) {
        const createdUser = await this.prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                age: user.age,
                password: user.password,
            },
        });
        return this.mapToEntity(createdUser);
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        return user ? this.mapToEntity(user) : null;
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        return user ? this.mapToEntity(user) : null;
    }
    async findAll() {
        const users = await this.prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return users.map(user => this.mapToEntity(user));
    }
    async update(id, user) {
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: {
                name: user.name,
                email: user.email,
                age: user.age,
                password: user.password,
                updatedAt: new Date(),
            },
        });
        return this.mapToEntity(updatedUser);
    }
    async delete(id) {
        await this.prisma.user.delete({
            where: { id },
        });
    }
    async exists(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: { id: true },
        });
        return !!user;
    }
    async existsByEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: { id: true },
        });
        return !!user;
    }
    mapToEntity(user) {
        return new user_entity_1.User(user.id, user.name, user.email, user.age, user.password, user.createdAt, user.updatedAt);
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUserRepository);
//# sourceMappingURL=prisma-user.repository.js.map