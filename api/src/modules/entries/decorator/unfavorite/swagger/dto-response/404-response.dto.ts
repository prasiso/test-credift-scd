import { ApiProperty } from '@nestjs/swagger';
import { ResponseErroGlobalSwagger } from 'src/decorator/dto';

export class RespFavoriteEntries404Dto extends ResponseErroGlobalSwagger {
  @ApiProperty({
    example: 'No word found',
  })
  message: any;
  @ApiProperty({ example: 404 })
  status: number;
}
