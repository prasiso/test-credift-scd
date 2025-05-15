import { ApiProperty } from '@nestjs/swagger';

export class RespUserMe200Dto {
  @ApiProperty({
    example: 4,
    description: 'Id de usuário',
  })
  id_user: number;
  @ApiProperty({
    example: 'Caio Bryan Francisco Silva',
    description: 'Nome do usuário',
  })
  name: string;
  @ApiProperty({
    example: 'caio_bryan_silva@hormail.com',
    description: 'Email do usuário',
  })
  email: string;

  @ApiProperty({
    example: '2025-05-11T00:00:00.000Z',
    description: 'Dt. criação',
  })
  created_at: string;
}
