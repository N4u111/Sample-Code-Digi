import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../../infrastructure/infrastructure.module';
import { CreatePermissionUseCase } from './create-permission.usecase';
import { GetPermissionByIdUseCase } from './get-permission-by-id.usecase';
import { GetAllPermissionsUseCase } from './get-all-permissions.usecase';
import { UpdatePermissionUseCase } from './update-permission.usecase';
import { DeletePermissionUseCase } from './delete-permission.usecase';

@Module({
  imports: [InfrastructureModule],
  providers: [
    CreatePermissionUseCase,
    GetPermissionByIdUseCase,
    GetAllPermissionsUseCase,
    UpdatePermissionUseCase,
    DeletePermissionUseCase,
  ],
  exports: [
    CreatePermissionUseCase,
    GetPermissionByIdUseCase,
    GetAllPermissionsUseCase,
    UpdatePermissionUseCase,
    DeletePermissionUseCase,
  ],
})
export class PermissionModule {}
