import { ApiProperty } from '@nestjs/swagger';

export class RespFindAllEntries200Dto {
  @ApiProperty({
    example: [
      'add fuel to the fire',
      'afire',
      'backfire',
      'backfired',
      'backfires',
      'balefire',
      'balefires',
      'ball of fire',
      'baptism of fire',
      'biscuit fire',
    ],
    description: 'Palavras',
  })
  results: any;

  @ApiProperty({
    example: 412,
    description: 'Total De Documento',
  })
  totalDocs: number;

  @ApiProperty({
    example: 1,
    description: 'Páginas',
  })
  page: number;

  @ApiProperty({
    example: 42,
    description: 'Total de Páginas',
  })
  totalPage: number;

  @ApiProperty({
    example: true,
    description: 'Pode Ir',
  })
  hasNext: boolean;
  @ApiProperty({
    example: true,
    description: 'Pode Voltar',
  })
  hasPrev: boolean;

}
