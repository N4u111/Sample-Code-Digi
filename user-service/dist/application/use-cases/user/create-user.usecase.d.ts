import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
import { CreateUserDto } from '../../dto/user.dto';
export declare class CreateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(dto: CreateUserDto): Promise<User>;
}
