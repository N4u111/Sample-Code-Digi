import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserServiceModule } from '../services/user-service/user-service.module';
import { HealthModule } from '../services/health/health.module';
import { RollbackModule } from '../services/rollback/rollback.module';
import { CommonModule } from '../shared/common/common.module';
import { MicroserviceExceptionFilter } from '../shared/common/filters/microservice-exception.filter';
import { ResponseInterceptor } from '../shared/common/interceptors/response.interceptor';
import { ValidationPipe } from '../shared/common/pipes/validation.pipe';

@Module({
  imports: [
    UserServiceModule,
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
