import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { RollbackModule } from './use-cases/rollback/rollback.module';
import { UserModule } from './use-cases/user/user.module';

@Module({
  imports: [InfrastructureModule, RollbackModule, UserModule],
  providers: [],
  exports: [RollbackModule, UserModule],
})
export class ApplicationModule {}
