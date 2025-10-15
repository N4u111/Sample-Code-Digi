import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserMessageController } from './controllers/user-message.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthMessageController } from './controllers/auth-message.controller';
import { RoleController } from './controllers/role.controller';
import { RoleMessageController } from './controllers/role-message.controller';
import { PermissionController } from './controllers/permission.controller';
import { PermissionMessageController } from './controllers/permission-message.controller';
import { GroupController } from './controllers/group.controller';
import { GroupMessageController } from './controllers/group-message.controller';
import { UserModule } from '../application/use-cases/user/user.module';
import { AuthModule } from '../application/use-cases/auth/auth.module';
import { RoleModule } from '../application/use-cases/role/role.module';
import { PermissionModule } from '../application/use-cases/permission/permission.module';
import { GroupModule } from '../application/use-cases/group/group.module';

@Module({
  imports: [UserModule, AuthModule, RoleModule, PermissionModule, GroupModule],
  controllers: [
    UserController, 
    UserMessageController, 
    AuthController, 
    AuthMessageController,
    RoleController,
    RoleMessageController,
    PermissionController,
    PermissionMessageController,
    GroupController,
    GroupMessageController
  ],
  providers: [],
  exports: [],
})
export class PresentationModule {}
