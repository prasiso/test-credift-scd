import { ApiProperty } from '@nestjs/swagger';
import { ResponseErroGlobalSwagger } from 'src/decorator/dto';

export class RespSignUp409Dto extends ResponseErroGlobalSwagger {
  @ApiProperty({
    example:
      'The email address provided is already registered in our system. Please use another email address.',
  })
  message: string;
}
