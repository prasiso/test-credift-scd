import { applyDecorators, Post } from '@nestjs/common';
import { Swagger } from './swagger';
import { SkipAuth } from 'src/guard';

export function d_sign_in() {
  return applyDecorators(Post('signin'), Swagger(), SkipAuth());
}
