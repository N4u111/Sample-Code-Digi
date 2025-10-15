import { Module } from '@nestjs/common';
import { RegisterUseCase } from './register.usecase';
import { LoginUseCase } from './login.usecase';
import { ForgotPasswordUseCase } from './forgot-password.usecase';
import { ResetPasswordUseCase } from './reset-password.usecase';
import { ValidateTokenUseCase } from './validate-token.usecase';
import { RefreshTokenUseCase } from './refresh-token.usecase';
import { InfrastructureModule } from '../../../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [
    RegisterUseCase,
    LoginUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    ValidateTokenUseCase,
    RefreshTokenUseCase,
  ],
  exports: [
    RegisterUseCase,
    LoginUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    ValidateTokenUseCase,
    RefreshTokenUseCase,
  ],
})
export class AuthModule {}
