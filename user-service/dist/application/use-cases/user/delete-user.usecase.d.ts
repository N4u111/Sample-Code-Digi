import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
export declare class DeleteUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(id: string): Promise<void>;
}
