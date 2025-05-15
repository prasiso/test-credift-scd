import { ApiProperty } from '@nestjs/swagger';
import { ResponseErroGlobalSwagger } from 'src/decorator/dto';

export class Resp400Dto extends ResponseErroGlobalSwagger {
  @ApiProperty({
    example: ['Password field cannot be empty', 'Email field cannot be empty'],
  })
  message: any;
  @ApiProperty({ example: 400 })
  status: number;
}
