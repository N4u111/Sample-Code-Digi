import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { RoleController } from './controllers/role.controller';
import { PermissionController } from './controllers/permission.controller';
import { GroupController } from './controllers/group.controller';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { PermissionService } from './services/permission.service';
import { GroupService } from './services/group.service';
import { MicroserviceService } from '../../shared/common/services/microservice.service';

@Module({
  controllers: [
    UserController,
    RoleController,
    PermissionController,
    GroupController,
  ],
  providers: [
    UserService,
    RoleService,
    PermissionService,
    GroupService,
    MicroserviceService,
  ],
  exports: [
    UserService,
    RoleService,
    PermissionService,
    GroupService,
  ],
})
export class UserManagementModule {}
