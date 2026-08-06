import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getStatus() {
    return {
      status: 'ok',
      service: 'FitnessOS API',
      timestamp: new Date().toISOString(),
    };
  }

  getReadiness() {
    return {
      status: 'ready',
    };
  }

  getLiveness() {
    return {
      status: 'alive',
    };
  }
}