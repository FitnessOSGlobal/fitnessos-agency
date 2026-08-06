import { Controller, Get } from '@nestjs/common';

import { HealthService } from './health.service';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('health')
  health() {
    return this.healthService.getStatus();
  }

  @Get('ready')
  readiness() {
    return this.healthService.getReadiness();
  }

  @Get('live')
  liveness() {
    return this.healthService.getLiveness();
  }
}