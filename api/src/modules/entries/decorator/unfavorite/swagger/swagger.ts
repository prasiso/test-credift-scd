import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ResponseSwagger } from './response';
export const Swagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Desfavoritar',
      description:
        'Responsável por retirar dos itens de favorito a palavara do usuário',
    }),
    ApiBearerAuth(),
    ResponseSwagger(),
  );
};
