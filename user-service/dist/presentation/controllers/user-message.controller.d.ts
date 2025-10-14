import { CreateUserUseCase } from '../../application/use-cases/user/create-user.usecase';
import { GetUserByIdUseCase } from '../../application/use-cases/user/get-user-by-id.usecase';
import { GetAllUsersUseCase } from '../../application/use-cases/user/get-all-users.usecase';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.usecase';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.usecase';
import { CreateUserDto, UpdateUserDto } from '../../application/dto/user.dto';
export declare class UserMessageController {
    private readonly createUserUseCase;
    private readonly getUserByIdUseCase;
    private readonly getAllUsersUseCase;
    private readonly updateUserUseCase;
    private readonly deleteUserUseCase;
    constructor(createUserUseCase: CreateUserUseCase, getUserByIdUseCase: GetUserByIdUseCase, getAllUsersUseCase: GetAllUsersUseCase, updateUserUseCase: UpdateUserUseCase, deleteUserUseCase: DeleteUserUseCase);
    create(data: CreateUserDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            email: string;
            age: number;
            createdAt: Date;
            updatedAt: Date;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: any;
        error: any;
        data?: undefined;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            email: string;
            age: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        error?: undefined;
    } | {
        success: boolean;
        message: any;
        error: any;
        data?: undefined;
    }>;
    findById(data: {
        id: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            email: string;
            age: number;
            createdAt: Date;
            updatedAt: Date;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: any;
        error: any;
        data?: undefined;
    }>;
    update(data: {
        id: string;
        updateData: UpdateUserDto;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            email: string;
            age: number;
            createdAt: Date;
            updatedAt: Date;
        };
        error?: undefined;
    } | {
        success: boolean;
        message: any;
        error: any;
        data?: undefined;
    }>;
    delete(data: {
        id: string;
    }): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        message: any;
        error: any;
    }>;
    test(): Promise<{
        success: boolean;
        message: string;
        timestamp: string;
    }>;
}
