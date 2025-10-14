export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    age: number;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    token: string;
    newPassword: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class AuthResponseDto {
    success: boolean;
    message: string;
    data?: {
        user: {
            id: string;
            name: string;
            email: string;
            age: number;
        };
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    };
}
export declare class TokenValidationDto {
    token: string;
}
export declare class TokenValidationResponseDto {
    success: boolean;
    message: string;
    data?: {
        valid: boolean;
        user?: {
            id: string;
            name: string;
            email: string;
            age: number;
        };
    };
}
