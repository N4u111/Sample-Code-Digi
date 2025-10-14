import { PrismaService } from '../database/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/interfaces/user.repository.interface';
export declare class PrismaUserRepository implements UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: string, user: User): Promise<User>;
    delete(id: string): Promise<void>;
    exists(id: string): Promise<boolean>;
    existsByEmail(email: string): Promise<boolean>;
    private mapToEntity;
}
