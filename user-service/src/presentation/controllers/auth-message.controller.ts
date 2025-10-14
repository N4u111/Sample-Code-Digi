import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
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
  RefreshTokenDto
} from '../../application/dto/auth.dto';

@Controller()
export class AuthMessageController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly validateTokenUseCase: ValidateTokenUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @MessagePattern('auth.register')
  async register(@Payload() data: RegisterDto) {
    try {
      const result = await this.registerUseCase.execute(data);
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @MessagePattern('auth.login')
  async login(@Payload() data: LoginDto) {
    try {
      const result = await this.loginUseCase.execute(data);
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @MessagePattern('auth.forgot-password')
  async forgotPassword(@Payload() data: ForgotPasswordDto) {
    try {
      const result = await this.forgotPasswordUseCase.execute(data);
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @MessagePattern('auth.reset-password')
  async resetPassword(@Payload() data: ResetPasswordDto) {
    try {
      const result = await this.resetPasswordUseCase.execute(data);
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @MessagePattern('auth.validate-token')
  async validateToken(@Payload() data: TokenValidationDto) {
    try {
      const result = await this.validateTokenUseCase.execute(data);
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @MessagePattern('auth.refresh-token')
  async refreshToken(@Payload() data: RefreshTokenDto) {
    try {
      const result = await this.refreshTokenUseCase.execute(data);
      return result;
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
