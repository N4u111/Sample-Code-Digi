import { OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse } from '../interfaces/microservice.interface';
export declare class MicroserviceService implements OnModuleInit {
    private readonly logger;
    private clients;
    onModuleInit(): Promise<void>;
    private initializeClients;
    private getQueueName;
    getClient(serviceName: string): ClientProxy;
    sendRequest<T>(serviceName: string, pattern: string, data: any, timeout?: number): Promise<ApiResponse<T>>;
    emitEvent(serviceName: string, pattern: string, data: any): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
