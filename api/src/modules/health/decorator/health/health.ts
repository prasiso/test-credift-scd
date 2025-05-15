import { applyDecorators, Get } from '@nestjs/common';
import { Swagger } from './swagger';
import { SkipAuth } from 'src/guard';

export function d_health() {
  return applyDecorators(Get(), Swagger(), SkipAuth());
}
