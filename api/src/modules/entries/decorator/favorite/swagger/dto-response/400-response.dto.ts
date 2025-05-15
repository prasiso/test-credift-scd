import { ApiProperty } from '@nestjs/swagger';
import { ResponseErroGlobalSwagger } from 'src/decorator/dto';

export class RespFavoriteEntries400Dto extends ResponseErroGlobalSwagger {
  @ApiProperty({
    example: 'The word in question is already among the favorite items.',
  })
  message: any;
  @ApiProperty({ example: 400 })
  status: number;
}
