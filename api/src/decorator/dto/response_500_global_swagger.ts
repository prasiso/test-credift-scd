import { ApiProperty } from '@nestjs/swagger';
import { ResponseErroGlobalSwagger } from './response_erro_global_swagger';

export class Resp500GlobalSwagger extends ResponseErroGlobalSwagger {
  @ApiProperty({
    example:
      '⚠️ Ocorreu um erro inesperado. Estamos trabalhando para resolver o mais rápido possível.',
    description: 'Descrição de erro',
  })
  message: string;
  @ApiProperty({
    example: 500,
    description: 'Status da response',
  })
  status: number;
}
