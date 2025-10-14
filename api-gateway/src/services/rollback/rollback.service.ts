import { Injectable, Logger } from '@nestjs/common';
import { MicroserviceService } from '../../shared/common/services/microservice.service';

@Injectable()
export class RollbackService {
  private readonly logger = new Logger(RollbackService.name);

  constructor(private readonly microserviceService: MicroserviceService) {}

  async restartUserService(): Promise<any> {
    try {
      this.logger.log('🔄 Sending restart command to user service...');
      
      const response = await this.microserviceService.sendRequest(
        'USER_SERVICE',
        'user.service.restart',
        {}
      );

      this.logger.log('✅ User service restart command sent successfully');
      return response;
    } catch (error) {
      this.logger.error(`❌ Failed to restart user service: ${error.message}`);
      return {
        success: false,
        message: 'Failed to restart user service',
        error: error.message
      };
    }
  }

  async checkUserServiceHealth(): Promise<any> {
    try {
      this.logger.log('🏥 Checking user service health...');
      
      const response = await this.microserviceService.sendRequest(
        'USER_SERVICE',
        'user.service.health',
        {}
      );

      this.logger.log('✅ User service health check completed');
      return response;
    } catch (error) {
      this.logger.error(`❌ User service health check failed: ${error.message}`);
      return {
        success: false,
        message: 'User service health check failed',
        error: error.message
      };
    }
  }

  async getUserServiceStatus(): Promise<any> {
    try {
      this.logger.log('📊 Getting user service status...');
      
      const response = await this.microserviceService.sendRequest(
        'USER_SERVICE',
        'user.service.status',
        {}
      );

      this.logger.log('✅ User service status retrieved');
      return response;
    } catch (error) {
      this.logger.error(`❌ Failed to get user service status: ${error.message}`);
      return {
        success: false,
        message: 'Failed to get user service status',
        error: error.message
      };
    }
  }

  async rollbackUserOperation(data: any): Promise<any> {
    try {
      this.logger.log('🔄 Rolling back user operation...');
      
      const response = await this.microserviceService.sendRequest(
        'USER_SERVICE',
        'user.rollback',
        data
      );

      this.logger.log('✅ User operation rollback completed');
      return response;
    } catch (error) {
      this.logger.error(`❌ User operation rollback failed: ${error.message}`);
      return {
        success: false,
        message: 'User operation rollback failed',
        error: error.message
      };
    }
  }

  async syncDataWithUserService(data: any): Promise<any> {
    try {
      this.logger.log('🔄 Syncing data with user service...');
      
      const response = await this.microserviceService.sendRequest(
        'USER_SERVICE',
        'user.sync',
        data
      );

      this.logger.log('✅ Data sync with user service completed');
      return response;
    } catch (error) {
      this.logger.error(`❌ Data sync with user service failed: ${error.message}`);
      return {
        success: false,
        message: 'Data sync with user service failed',
        error: error.message
      };
    }
  }
}
