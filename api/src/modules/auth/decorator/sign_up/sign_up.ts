import { applyDecorators, Post } from '@nestjs/common';
import { Swagger } from './swagger';
import { SkipAuth } from 'src/guard';

export function d_sign_up() {
  return applyDecorators(Post('signup'), Swagger(), SkipAuth());
}
