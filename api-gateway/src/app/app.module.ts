import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagementModule } from '../services/user-management/user-management.module';
import { HealthModule } from '../services/health/health.module';
import { RollbackModule } from '../services/rollback/rollback.module';
import { CommonModule } from '../shared/common/common.module';
import { MicroserviceExceptionFilter } from '../shared/common/filters/microservice-exception.filter';
import { ResponseInterceptor } from '../shared/common/interceptors/response.interceptor';
import { ValidationPipe } from '../shared/common/pipes/validation.pipe';

@Module({
  imports: [
    UserManagementModule,
    HealthModule,
    RollbackModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: MicroserviceExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
