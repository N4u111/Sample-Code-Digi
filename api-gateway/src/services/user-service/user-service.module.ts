import { Module } from '@nestjs/common';
import { CommonModule } from '../../shared/common/common.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserServiceModule {}
