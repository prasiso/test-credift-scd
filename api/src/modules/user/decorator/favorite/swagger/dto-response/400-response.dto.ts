import { ApiProperty } from '@nestjs/swagger';
import { ResponseErroGlobalSwagger } from 'src/decorator/dto';

export class RespHistory400Dto extends ResponseErroGlobalSwagger {
  @ApiProperty({
    example: ['query page not sent', 'query limit not sent'],
  })
  message: any;
  @ApiProperty({ example: 400 })
  status: number;
}
