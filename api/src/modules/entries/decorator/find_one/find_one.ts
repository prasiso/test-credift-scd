import { applyDecorators, Get } from '@nestjs/common';
import { Swagger } from './swagger';

export function d_find_one() {
  return applyDecorators(Get(':word'), Swagger());
}
