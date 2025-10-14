"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MicroserviceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroserviceService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const microservice_config_1 = require("../config/microservice.config");
let MicroserviceService = MicroserviceService_1 = class MicroserviceService {
    constructor() {
        this.logger = new common_1.Logger(MicroserviceService_1.name);
        this.clients = new Map();
    }
    async onModuleInit() {
        await this.initializeClients();
    }
    async initializeClients() {
        for (const [serviceName, config] of Object.entries(microservice_config_1.MICROSERVICE_CONFIGS)) {
            try {
                const client = microservices_1.ClientProxyFactory.create({
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: [microservice_config_1.RABBITMQ_CONFIG.url],
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
                this.logger.log(`Connected to ${serviceName} via RabbitMQ at ${microservice_config_1.RABBITMQ_CONFIG.url}`);
            }
            catch (error) {
                this.logger.error(`Failed to connect to ${serviceName}: ${error.message}`);
            }
        }
    }
    getQueueName(serviceName) {
        switch (serviceName) {
            case 'USER_SERVICE':
                return microservice_config_1.RABBITMQ_CONFIG.queue.user;
            default:
                throw new Error(`Unknown service name: ${serviceName}`);
        }
    }
    getClient(serviceName) {
        const client = this.clients.get(serviceName);
        if (!client) {
            throw new Error(`Client not found for service: ${serviceName}`);
        }
        return client;
    }
    async sendRequest(serviceName, pattern, data, timeout = 5000) {
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
        }
        catch (error) {
            this.logger.error(`Request to ${serviceName}:${pattern} - Failed: ${error.message}`);
            return {
                success: false,
                message: 'Request failed',
                error: error.message,
                statusCode: 500,
            };
        }
    }
    async emitEvent(serviceName, pattern, data) {
        try {
            const client = this.getClient(serviceName);
            client.emit(pattern, data);
            this.logger.log(`Event emitted to ${serviceName}:${pattern}`);
        }
        catch (error) {
            this.logger.error(`Failed to emit event to ${serviceName}:${pattern} - ${error.message}`);
        }
    }
    async onModuleDestroy() {
        for (const [serviceName, client] of this.clients) {
            try {
                await client.close();
                this.logger.log(`Disconnected from ${serviceName}`);
            }
            catch (error) {
                this.logger.error(`Error disconnecting from ${serviceName}: ${error.message}`);
            }
        }
    }
};
exports.MicroserviceService = MicroserviceService;
exports.MicroserviceService = MicroserviceService = MicroserviceService_1 = __decorate([
    (0, common_1.Injectable)()
], MicroserviceService);
//# sourceMappingURL=microservice.service.js.map