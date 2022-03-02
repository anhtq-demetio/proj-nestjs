import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { DbHealthIndicator } from '../indicators/db.healthIndicator';

@ApiTags('health')
@Controller('api/health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: DbHealthIndicator,
  ) {}

  @ApiOperation({ summary: 'Entry point for health check' })
  @ApiResponse({
    status: 200,
    description:
      'Entry point for health check. ' +
      'Use @nestjs/terminus to check status of DB, etc. ' +
      'https://github.com/nestjs/terminus',
  })
  @Get()
  @HealthCheck()
  healthCheck() {
    return this.health.check([() => this.db.isHealthy('database')]);
  }
}
