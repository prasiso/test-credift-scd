import { ApiProperty } from '@nestjs/swagger';

export class RespHealth200Dto {
  @ApiProperty({
    example: 'Fullstack Challenge 🏅 - Dictionary',
    description: 'Mensagem de health',
  })
  message: string;
}
