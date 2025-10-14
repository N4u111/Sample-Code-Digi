export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class ValidateTokenDto {
    token: string;
}
export declare class LogoutDto {
    userId: string;
}
