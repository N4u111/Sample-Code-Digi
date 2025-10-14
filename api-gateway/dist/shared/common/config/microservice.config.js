"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMicroserviceConfig = exports.USER_SERVICE = exports.RABBITMQ_CONFIG = exports.MICROSERVICE_CONFIGS = void 0;
exports.MICROSERVICE_CONFIGS = {
    USER_SERVICE: {
        name: 'USER_SERVICE',
        host: process.env.RABBITMQ_HOST || 'localhost',
        port: parseInt(process.env.RABBITMQ_PORT || '5672'),
        transport: 'RMQ',
    },
};
exports.RABBITMQ_CONFIG = {
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
exports.USER_SERVICE = 'USER_SERVICE';
const getMicroserviceConfig = (serviceName) => {
    const config = exports.MICROSERVICE_CONFIGS[serviceName];
    if (!config) {
        throw new Error(`Microservice configuration not found for: ${serviceName}`);
    }
    return config;
};
exports.getMicroserviceConfig = getMicroserviceConfig;
//# sourceMappingURL=microservice.config.js.map