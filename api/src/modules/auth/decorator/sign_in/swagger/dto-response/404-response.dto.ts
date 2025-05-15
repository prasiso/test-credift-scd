import { ApiProperty } from '@nestjs/swagger';
import { ResponseErroGlobalSwagger } from 'src/decorator/dto';

export class Resp404Dto extends ResponseErroGlobalSwagger {
  @ApiProperty({
    example:
      'The email address provided was not found in our system. Please check and try again.',
  })
  message: any;
  @ApiProperty({ example: 404 })
  status: number;
}
