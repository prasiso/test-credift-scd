import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ResponseSwagger } from './response';
export const Swagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar Palavras',
      description: 'Responsável por buscar todas as palavras',
    }),
    ApiBearerAuth(),
    ResponseSwagger(),
  );
};
