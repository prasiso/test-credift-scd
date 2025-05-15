import { applyDecorators, Get } from '@nestjs/common';
import { Swagger } from './swagger';

export function d_find_all() {
  return applyDecorators(Get(''), Swagger());
}
