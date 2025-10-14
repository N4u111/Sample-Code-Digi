import { MicroserviceConfig } from '../interfaces/microservice.interface';

export const MICROSERVICE_CONFIGS: Record<string, MicroserviceConfig> = {
  USER_SERVICE: {
    name: 'USER_SERVICE',
    host: process.env.RABBITMQ_HOST || 'localhost',
    port: parseInt(process.env.RABBITMQ_PORT || '5672'),
    transport: 'RMQ',
  },
};

export const RABBITMQ_CONFIG = {
  url: process.env.RABBITMQ_URL || 'amqp://admin:admin123@localhost:5672',
  queue: {
    user: 'user_service_queue',
  },
  exchange: {
    user: 'user_exchange',
  },
  routingKey: {
    user: 'user.routing.key',
  },
};

export const USER_SERVICE = 'USER_SERVICE';

export const getMicroserviceConfig = (serviceName: string): MicroserviceConfig => {
  const config = MICROSERVICE_CONFIGS[serviceName];
  if (!config) {
    throw new Error(`Microservice configuration not found for: ${serviceName}`);
  }
  return config;
};
