import { CreateUserUseCase } from '../../application/use-cases/user/create-user.usecase';
import { GetUserByIdUseCase } from '../../application/use-cases/user/get-user-by-id.usecase';
import { GetAllUsersUseCase } from '../../application/use-cases/user/get-all-users.usecase';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user.usecase';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user.usecase';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../../application/dto/user.dto';
export declare class UserController {
    private readonly createUserUseCase;
    private readonly getUserByIdUseCase;
    private readonly getAllUsersUseCase;
    private readonly updateUserUseCase;
    private readonly deleteUserUseCase;
    constructor(createUserUseCase: CreateUserUseCase, getUserByIdUseCase: GetUserByIdUseCase, getAllUsersUseCase: GetAllUsersUseCase, updateUserUseCase: UpdateUserUseCase, deleteUserUseCase: DeleteUserUseCase);
    test(): Promise<{
        message: string;
    }>;
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    findAll(): Promise<UserResponseDto[]>;
    findOne(id: string): Promise<UserResponseDto>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    remove(id: string): Promise<void>;
}
