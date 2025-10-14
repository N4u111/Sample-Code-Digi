import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
export declare class GetAllUsersUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(): Promise<User[]>;
}
