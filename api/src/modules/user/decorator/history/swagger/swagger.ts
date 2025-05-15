import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseSwagger } from './response';
export const Swagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Dados das últimas palavras acessadas',
      description:
        'End point responsável por listar últimas palavras acessadas do usuário',
    }),
    ResponseSwagger(),
  );
};
