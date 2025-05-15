import { ApiProperty } from '@nestjs/swagger';

class WordResultDto {
  @ApiProperty({ example: 'fiddlesticks' })
  word: string;

  @ApiProperty({
    example: '2025-05-11T18:24:36.988Z',
    type: String,
    format: 'date-time',
  })
  added: string;
}

export class RespFavorite200Dto {
  @ApiProperty({ type: [WordResultDto] })
  results: WordResultDto[];

  @ApiProperty({ example: 4 })
  totalDocs: number;

  @ApiProperty({ example: 2 })
  page: number;

  @ApiProperty({ example: 4 })
  totalPage: number;

  @ApiProperty({ example: true })
  hasNext: boolean;

  @ApiProperty({ example: true })
  hasPrev: boolean;
}
