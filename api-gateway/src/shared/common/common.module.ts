import { Module } from '@nestjs/common';
import { JwtAuthGuard, RateLimitGuard } from './guards';
import { AuthService } from '../../services/auth-service/auth/auth.service';
import { MicroserviceService } from './services/microservice.service';
import { RateLimitService } from './services/rate-limit.service';

@Module({
  providers: [JwtAuthGuard, RateLimitGuard, AuthService, MicroserviceService, RateLimitService],
  exports: [JwtAuthGuard, RateLimitGuard, AuthService, MicroserviceService, RateLimitService],
})
export class CommonModule {}