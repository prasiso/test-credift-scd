import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ResponseSwagger } from './response';
export const Swagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar Palavra Única',
      description: 'Responsável por buscar palavra única',
    }),
    ApiBearerAuth(),
    ResponseSwagger(),
  );
};
