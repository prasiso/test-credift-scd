import { applyDecorators, Get } from '@nestjs/common';
import { Swagger } from './swagger';

export function d_user_me() {
  return applyDecorators(Get(), Swagger());
}
