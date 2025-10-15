import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { UserModule } from './use-cases/user/user.module';
import { AuthModule } from './use-cases/auth/auth.module';
import { RoleModule } from './use-cases/role/role.module';
import { PermissionModule } from './use-cases/permission/permission.module';
import { GroupModule } from './use-cases/group/group.module';

@Module({
  imports: [InfrastructureModule, UserModule, AuthModule, RoleModule, PermissionModule, GroupModule],
  providers: [],
  exports: [UserModule, AuthModule, RoleModule, PermissionModule, GroupModule],
})
export class ApplicationModule {}
