import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
import { UpdateUserDto } from '../../dto/user.dto';
export declare class UpdateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(id: string, dto: UpdateUserDto): Promise<User>;
}
