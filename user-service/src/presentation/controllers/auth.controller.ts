import { 
  Controller, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { RegisterUseCase } from '../../application/use-cases/auth/register.usecase';
import { LoginUseCase } from '../../application/use-cases/auth/login.usecase';
import { ForgotPasswordUseCase } from '../../application/use-cases/auth/forgot-password.usecase';
import { ResetPasswordUseCase } from '../../application/use-cases/auth/reset-password.usecase';
import { ValidateTokenUseCase } from '../../application/use-cases/auth/validate-token.usecase';
import { RefreshTokenUseCase } from '../../application/use-cases/auth/refresh-token.usecase';
import { 
  RegisterDto, 
  LoginDto, 
  ForgotPasswordDto, 
  ResetPasswordDto, 
  TokenValidationDto, 
  RefreshTokenDto,
  AuthResponseDto,
  TokenValidationResponseDto
} from '../../application/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly validateTokenUseCase: ValidateTokenUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return await this.registerUseCase.execute(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return await this.loginUseCase.execute(loginDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<{ success: boolean; message: string }> {
    return await this.forgotPasswordUseCase.execute(forgotPasswordDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ success: boolean; message: string }> {
    return await this.resetPasswordUseCase.execute(resetPasswordDto);
  }

  @Post('validate-token')
  @HttpCode(HttpStatus.OK)
  async validateToken(@Body() tokenValidationDto: TokenValidationDto): Promise<TokenValidationResponseDto> {
    return await this.validateTokenUseCase.execute(tokenValidationDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto> {
    return await this.refreshTokenUseCase.execute(refreshTokenDto);
  }
}
