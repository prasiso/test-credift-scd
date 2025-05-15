import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseSwagger } from './response';
export const Swagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Cadastro',
      description: 'Responsavel por cadastro de user',
    }),
    ResponseSwagger(),
  );
};
