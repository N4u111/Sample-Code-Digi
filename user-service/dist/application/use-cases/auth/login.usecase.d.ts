import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
import { LoginDto, AuthResponseDto } from '../../dto/auth.dto';
export declare class LoginUseCase {
    private readonly userRepository;
    private readonly JWT_SECRET;
    private readonly JWT_EXPIRES_IN;
    private readonly REFRESH_TOKEN_EXPIRES_IN;
    constructor(userRepository: UserRepository);
    execute(dto: LoginDto): Promise<AuthResponseDto>;
    private generateAccessToken;
    private generateRefreshToken;
}
