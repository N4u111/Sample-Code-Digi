import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserMessageController } from './controllers/user-message.controller';
import { UserModule } from '../application/use-cases/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [UserController, UserMessageController],
  providers: [],
  exports: [],
})
export class PresentationModule {}
