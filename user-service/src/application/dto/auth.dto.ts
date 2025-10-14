import { IsString, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(3)
  age: number;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  newPassword: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

export class AuthResponseDto {
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

export class TokenValidationDto {
  @IsString()
  token: string;
}

export class TokenValidationResponseDto {
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
