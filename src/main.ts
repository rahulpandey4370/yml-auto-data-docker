import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './handlers/all-exceptions.filter';
import { logger } from './config/logger'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger,
    cors: true,
  });
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  const config = new DocumentBuilder()
    .setTitle('JD Power')
    .setDescription('Fetch Vehicle details using VIN')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('vehicle-info', app, document);
  await app.listen(3000);
}
bootstrap();

