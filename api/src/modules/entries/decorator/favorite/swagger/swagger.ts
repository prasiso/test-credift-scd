import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ResponseSwagger } from './response';
export const Swagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Favoritar Palavra',
      description: 'Responsável por favoritar palavara do usuário',
    }),
    ApiBearerAuth(),
    ResponseSwagger(),
  );
};
