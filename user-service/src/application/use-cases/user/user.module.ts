import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './create-user.usecase';
import { GetUserByIdUseCase } from './get-user-by-id.usecase';
import { GetAllUsersUseCase } from './get-all-users.usecase';
import { UpdateUserUseCase } from './update-user.usecase';
import { DeleteUserUseCase } from './delete-user.usecase';
import { InfrastructureModule } from '../../../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    GetAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [
    CreateUserUseCase,
    GetUserByIdUseCase,
    GetAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserModule {}
