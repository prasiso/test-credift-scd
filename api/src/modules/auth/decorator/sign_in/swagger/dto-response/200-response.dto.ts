import { ApiProperty } from '@nestjs/swagger';

export class Resp200Dto {
  @ApiProperty({
    example: 1,
    description: 'Id do User',
  })
  id: number;

  @ApiProperty({
    example: 'User 1',
    description: 'Nome do usuário',
  })
  name: string;

  @ApiProperty({
    example: 'Bearer JWT.Token',
    description: 'Token do usuário',
  })
  token: string;
}
