import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { getMicroserviceConfig, MICROSERVICE_CONFIGS, RABBITMQ_CONFIG } from '../config/microservice.config';
import { MicroserviceConfig, ApiResponse } from '../interfaces/microservice.interface';

@Injectable()
export class MicroserviceService implements OnModuleInit {
  private readonly logger = new Logger(MicroserviceService.name);
  private clients: Map<string, ClientProxy> = new Map();

  async onModuleInit() {
    await this.initializeClients();
  }

  private async initializeClients() {
    for (const [serviceName, config] of Object.entries(MICROSERVICE_CONFIGS)) {
      try {
        const client = ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [RABBITMQ_CONFIG.url],
            queue: this.getQueueName(serviceName),
            queueOptions: {
              durable: true,
            },
            socketOptions: {
              heartbeatIntervalInSeconds: 60,
              reconnectTimeInSeconds: 5,
            },
          },
        });

        await client.connect();
        this.clients.set(serviceName, client);
        this.logger.log(`Connected to ${serviceName} via RabbitMQ at ${RABBITMQ_CONFIG.url}`);
      } catch (error) {
        this.logger.error(`Failed to connect to ${serviceName}: ${error.message}`);
      }
    }
  }

  private getQueueName(serviceName: string): string {
    switch (serviceName) {
      case 'USER_SERVICE':
        return RABBITMQ_CONFIG.queue.user;
      default:
        throw new Error(`Unknown service name: ${serviceName}`);
    }
  }

  getClient(serviceName: string): ClientProxy {
    const client = this.clients.get(serviceName);
    if (!client) {
      throw new Error(`Client not found for service: ${serviceName}`);
    }
    return client;
  }

  async sendRequest<T>(
    serviceName: string,
    pattern: string,
    data: any,
    timeout: number = 5000,
  ): Promise<ApiResponse<T>> {
    try {
      const client = this.getClient(serviceName);
      console.log('serviceName', serviceName);
      const response = await client.send(pattern, data).toPromise();
      this.logger.log(`Request to ${serviceName}:${pattern} - Success`);
      return {
        success: true,
        message: 'Request successful',
        data: response,
      };
    } catch (error) {
      this.logger.error(`Request to ${serviceName}:${pattern} - Failed: ${error.message}`);
      return {
        success: false,
        message: 'Request failed',
        error: error.message,
        statusCode: 500,
      };
    }
  }

  async emitEvent(serviceName: string, pattern: string, data: any): Promise<void> {
    try {
      const client = this.getClient(serviceName);
      client.emit(pattern, data);
      this.logger.log(`Event emitted to ${serviceName}:${pattern}`);
    } catch (error) {
      this.logger.error(`Failed to emit event to ${serviceName}:${pattern} - ${error.message}`);
    }
  }

  async onModuleDestroy() {
    for (const [serviceName, client] of this.clients) {
      try {
        await client.close();
        this.logger.log(`Disconnected from ${serviceName}`);
      } catch (error) {
        this.logger.error(`Error disconnecting from ${serviceName}: ${error.message}`);
      }
    }
  }
}
