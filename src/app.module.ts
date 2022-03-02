import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './application/controllers/health.controller';
import { DbHealthIndicator } from './application/indicators/db.healthIndicator';
import { PrismaRepository } from './infrastructure/repositories/prisma.repository';
import { LoggerModule } from './modules/logger.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { MaintenanceMiddleware } from './middleware/maintenance.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 0,
    }),
    TerminusModule,
    LoggerModule,
  ],
  controllers: [HealthController],
  providers: [DbHealthIndicator, PrismaRepository],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('api');
    consumer.apply(MaintenanceMiddleware).forRoutes('api');
  }
}
