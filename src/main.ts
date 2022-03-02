import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from './logger/logger.service';
import { AllExceptionsFilter } from './all.exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});

  app.disable('x-powered-by');

  // use custom logger
  app.useLogger(app.get(Logger));

  app.useGlobalFilters(new AllExceptionsFilter());

  const configService = app.get(ConfigService);
  if (configService.get('NODE_ENV') === 'development') {
    // swagger setting
    const config = new DocumentBuilder()
      .setTitle('skyhub-api')
      .setDescription("This API is skyhub's API")
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger-ui', app, document);
  }

  // cors setting
  app.enableCors({
    origin: ['https://localhost:1234', 'http://localhost:1234'],
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authentication, x-authorization',
    credentials: true,
  });

  // form setting
  app.useGlobalPipes(new ValidationPipe());

  // cookie
  app.use(cookieParser());

  // bodyParser setting
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
