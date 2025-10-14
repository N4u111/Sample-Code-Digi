import { RegisterUseCase } from '../../application/use-cases/auth/register.usecase';
import { LoginUseCase } from '../../application/use-cases/auth/login.usecase';
import { ForgotPasswordUseCase } from '../../application/use-cases/auth/forgot-password.usecase';
import { ResetPasswordUseCase } from '../../application/use-cases/auth/reset-password.usecase';
import { ValidateTokenUseCase } from '../../application/use-cases/auth/validate-token.usecase';
import { RefreshTokenUseCase } from '../../application/use-cases/auth/refresh-token.usecase';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, TokenValidationDto, RefreshTokenDto, AuthResponseDto, TokenValidationResponseDto } from '../../application/dto/auth.dto';
export declare class AuthController {
    private readonly registerUseCase;
    private readonly loginUseCase;
    private readonly forgotPasswordUseCase;
    private readonly resetPasswordUseCase;
    private readonly validateTokenUseCase;
    private readonly refreshTokenUseCase;
    constructor(registerUseCase: RegisterUseCase, loginUseCase: LoginUseCase, forgotPasswordUseCase: ForgotPasswordUseCase, resetPasswordUseCase: ResetPasswordUseCase, validateTokenUseCase: ValidateTokenUseCase, refreshTokenUseCase: RefreshTokenUseCase);
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    validateToken(tokenValidationDto: TokenValidationDto): Promise<TokenValidationResponseDto>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto>;
}
