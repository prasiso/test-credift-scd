import { ApiProperty } from '@nestjs/swagger';

export class ResponseErroGlobalSwagger {
  @ApiProperty({
    example: '2025-05-10T20:17:37.186Z',
    description: 'Data de envio da request',
  })
  timestamp: Date;
  @ApiProperty({
    example: '/',
    description: 'Caminho do end point',
  })
  path: string;
}
