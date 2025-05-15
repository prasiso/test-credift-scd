import { applyDecorators, Get } from '@nestjs/common';
import { Swagger } from './swagger';

export function d_favorite() {
  return applyDecorators(Get('favorites'), Swagger());
}
