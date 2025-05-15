import { applyDecorators, Post } from '@nestjs/common';
import { Swagger } from './swagger';

export function d_favorite() {
  return applyDecorators(Post(':word/favorite'), Swagger());
}
