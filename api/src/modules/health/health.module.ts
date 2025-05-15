import { Module } from '@nestjs/common';
import { HealthRouter, HealthController } from './';

@Module({
  controllers: [HealthRouter],
  providers: [HealthController],
})
export class HealthModule {}
