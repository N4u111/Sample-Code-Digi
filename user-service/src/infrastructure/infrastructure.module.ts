import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { PrismaRoleRepository } from './repositories/prisma-role.repository';
import { PrismaPermissionRepository } from './repositories/prisma-permission.repository';
import { PrismaGroupRepository } from './repositories/prisma-group.repository';
import { USER_REPOSITORY } from '../domain/tokens/user.tokens';
import { ROLE_REPOSITORY } from '../domain/tokens/role.tokens';
import { PERMISSION_REPOSITORY } from '../domain/tokens/permission.tokens';
import { GROUP_REPOSITORY } from '../domain/tokens/group.tokens';

@Module({
  providers: [
    PrismaService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: ROLE_REPOSITORY,
      useClass: PrismaRoleRepository,
    },
    {
      provide: PERMISSION_REPOSITORY,
      useClass: PrismaPermissionRepository,
    },
    {
      provide: GROUP_REPOSITORY,
      useClass: PrismaGroupRepository,
    },
  ],
  exports: [
    PrismaService, 
    USER_REPOSITORY, 
    ROLE_REPOSITORY, 
    PERMISSION_REPOSITORY, 
    GROUP_REPOSITORY
  ],
})
export class InfrastructureModule {}
