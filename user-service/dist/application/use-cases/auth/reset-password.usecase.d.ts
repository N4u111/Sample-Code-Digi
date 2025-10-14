import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
import { ResetPasswordDto } from '../../dto/auth.dto';
export declare class ResetPasswordUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(dto: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    private isValidResetToken;
    private extractUserIdFromToken;
}
