import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseSwagger } from './response';
export const Swagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Dados de usuário logado',
      description: 'Responsável por end point de usuário',
    }),
    ResponseSwagger(),
  );
};
