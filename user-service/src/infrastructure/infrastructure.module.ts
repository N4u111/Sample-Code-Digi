import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { USER_REPOSITORY } from '../domain/tokens/user.tokens';

@Module({
  providers: [
    PrismaService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaService, USER_REPOSITORY],
})
export class InfrastructureModule {}
