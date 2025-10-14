import { Module } from '@nestjs/common';
import { RollbackController } from './rollback.controller';
import { RollbackService } from './rollback.service';
import { CommonModule } from '../../shared/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [RollbackController],
  providers: [RollbackService],
  exports: [RollbackService],
})
export class RollbackModule {}
