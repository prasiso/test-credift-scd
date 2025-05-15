import { ApiProperty } from '@nestjs/swagger';
import { ResponseErroGlobalSwagger } from './response_erro_global_swagger';

export class Resp401GlobalSwagger extends ResponseErroGlobalSwagger {
  @ApiProperty({
    example: 'Não autorizado!',
    description: 'Descrição de erro',
  })
  message: string;
  @ApiProperty({
    example: 401,
    description: 'Status da response',
  })
  status: number;
}
