import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
import { ForgotPasswordDto } from '../../dto/auth.dto';
export declare class ForgotPasswordUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(dto: ForgotPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
