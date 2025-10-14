import { UserRepository } from '../../../domain/interfaces/user.repository.interface';
import { TokenValidationDto, TokenValidationResponseDto } from '../../dto/auth.dto';
export declare class ValidateTokenUseCase {
    private readonly userRepository;
    private readonly JWT_SECRET;
    constructor(userRepository: UserRepository);
    execute(dto: TokenValidationDto): Promise<TokenValidationResponseDto>;
}
