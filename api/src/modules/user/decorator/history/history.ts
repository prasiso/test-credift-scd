import { applyDecorators, Get } from '@nestjs/common';
import { Swagger } from './swagger';

export function d_history() {
  return applyDecorators(Get('history'), Swagger());
}
