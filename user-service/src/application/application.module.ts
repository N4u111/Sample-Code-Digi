import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { RollbackModule } from './use-cases/rollback/rollback.module';
import { UserModule } from './use-cases/user/user.module';
import { AuthModule } from './use-cases/auth/auth.module';

@Module({
  imports: [InfrastructureModule, RollbackModule, UserModule, AuthModule],
  providers: [],
  exports: [RollbackModule, UserModule, AuthModule],
})
export class ApplicationModule {}
