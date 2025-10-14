import { RegisterUseCase } from '../../application/use-cases/auth/register.usecase';
import { LoginUseCase } from '../../application/use-cases/auth/login.usecase';
import { ForgotPasswordUseCase } from '../../application/use-cases/auth/forgot-password.usecase';
import { ResetPasswordUseCase } from '../../application/use-cases/auth/reset-password.usecase';
import { ValidateTokenUseCase } from '../../application/use-cases/auth/validate-token.usecase';
import { RefreshTokenUseCase } from '../../application/use-cases/auth/refresh-token.usecase';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, TokenValidationDto, RefreshTokenDto } from '../../application/dto/auth.dto';
export declare class AuthMessageController {
    private readonly registerUseCase;
    private readonly loginUseCase;
    private readonly forgotPasswordUseCase;
    private readonly resetPasswordUseCase;
    private readonly validateTokenUseCase;
    private readonly refreshTokenUseCase;
    constructor(registerUseCase: RegisterUseCase, loginUseCase: LoginUseCase, forgotPasswordUseCase: ForgotPasswordUseCase, resetPasswordUseCase: ResetPasswordUseCase, validateTokenUseCase: ValidateTokenUseCase, refreshTokenUseCase: RefreshTokenUseCase);
    register(data: RegisterDto): Promise<import("../../application/dto/auth.dto").AuthResponseDto | {
        success: boolean;
        message: any;
    }>;
    login(data: LoginDto): Promise<import("../../application/dto/auth.dto").AuthResponseDto | {
        success: boolean;
        message: any;
    }>;
    forgotPassword(data: ForgotPasswordDto): Promise<{
        success: boolean;
        message: any;
    }>;
    resetPassword(data: ResetPasswordDto): Promise<{
        success: boolean;
        message: any;
    }>;
    validateToken(data: TokenValidationDto): Promise<import("../../application/dto/auth.dto").TokenValidationResponseDto | {
        success: boolean;
        message: any;
    }>;
    refreshToken(data: RefreshTokenDto): Promise<import("../../application/dto/auth.dto").AuthResponseDto | {
        success: boolean;
        message: any;
    }>;
}
