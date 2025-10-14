"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    const microservice = app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqp://admin:admin123@localhost:5672'],
            queue: 'user_service_queue',
            queueOptions: {
                durable: true,
            },
            socketOptions: {
                heartbeatIntervalInSeconds: 60,
                reconnectTimeInSeconds: 5,
            },
        },
    });
    await app.startAllMicroservices();
    const port = 3002;
    await app.listen(port);
    logger.log(`User Service is running on port: ${port}`);
    logger.log('User Service is also running on RabbitMQ queue: user_service_queue');
}
bootstrap();
//# sourceMappingURL=main.js.map