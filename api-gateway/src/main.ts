import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`API Gateway is running on: http://localhost:${port}`);
}
bootstrap();
