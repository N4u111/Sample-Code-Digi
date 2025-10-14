import { MicroserviceService } from '../../shared/common/services/microservice.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../../shared/common/dto/user.dto';
export declare class UserService {
    private readonly microserviceService;
    private readonly logger;
    constructor(microserviceService: MicroserviceService);
    createUser(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    getAllUsers(): Promise<UserResponseDto[]>;
    getUserById(id: string): Promise<UserResponseDto>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    deleteUser(id: string): Promise<void>;
}
