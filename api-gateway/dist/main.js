"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app/app.module");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`API Gateway is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map