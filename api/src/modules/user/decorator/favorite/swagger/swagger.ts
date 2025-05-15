import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseSwagger } from './response';
export const Swagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Dados das palavras favoritadas',
      description:
        'End point responsável por listar palavras favoritadas pelo usuário',
    }),
    ResponseSwagger(),
  );
};
