import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserMessageController } from './controllers/user-message.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthMessageController } from './controllers/auth-message.controller';
import { UserModule } from '../application/use-cases/user/user.module';
import { AuthModule } from '../application/use-cases/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [UserController, UserMessageController, AuthController, AuthMessageController],
  providers: [],
  exports: [],
})
export class PresentationModule {}
