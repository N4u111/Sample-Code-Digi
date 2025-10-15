import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../../../infrastructure/infrastructure.module';
import { CreateGroupUseCase } from './create-group.usecase';
import { GetGroupByIdUseCase } from './get-group-by-id.usecase';
import { GetAllGroupsUseCase } from './get-all-groups.usecase';
import { UpdateGroupUseCase } from './update-group.usecase';
import { DeleteGroupUseCase } from './delete-group.usecase';

@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateGroupUseCase,
    GetGroupByIdUseCase,
    GetAllGroupsUseCase,
    UpdateGroupUseCase,
    DeleteGroupUseCase,
  ],
  exports: [
    CreateGroupUseCase,
    GetGroupByIdUseCase,
    GetAllGroupsUseCase,
    UpdateGroupUseCase,
    DeleteGroupUseCase,
  ],
})
export class GroupModule {}
