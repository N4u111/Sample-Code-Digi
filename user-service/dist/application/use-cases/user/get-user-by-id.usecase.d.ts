import { User } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
export declare class GetUserByIdUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(id: string): Promise<User>;
}
