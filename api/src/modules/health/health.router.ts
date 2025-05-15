import { Controller } from '@nestjs/common';
import { HealthController } from './health.controller';
import { d_health } from './decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('')
@ApiTags('Health')
export class HealthRouter {
  constructor(private readonly health_controller: HealthController) {}
  @d_health()
  async health() {
    return await this.health_controller.health();
  }
}
