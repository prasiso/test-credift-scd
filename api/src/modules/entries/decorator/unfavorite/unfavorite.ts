import { applyDecorators, Delete } from '@nestjs/common';
import { Swagger } from './swagger';

export function d_unfavorite() {
  return applyDecorators(Delete(':word/unfavorite'), Swagger());
}
