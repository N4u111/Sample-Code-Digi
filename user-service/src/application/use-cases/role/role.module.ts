import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../../infrastructure/infrastructure.module';
import { CreateRoleUseCase } from './create-role.usecase';
import { GetRoleByIdUseCase } from './get-role-by-id.usecase';
import { GetAllRolesUseCase } from './get-all-roles.usecase';
import { UpdateRoleUseCase } from './update-role.usecase';
import { DeleteRoleUseCase } from './delete-role.usecase';

@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateRoleUseCase,
    GetRoleByIdUseCase,
    GetAllRolesUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
  ],
  exports: [
    CreateRoleUseCase,
    GetRoleByIdUseCase,
    GetAllRolesUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
  ],
})
export class RoleModule {}
