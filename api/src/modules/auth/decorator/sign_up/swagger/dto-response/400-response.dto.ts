import { ApiProperty } from '@nestjs/swagger';
import { ResponseErroGlobalSwagger } from 'src/decorator/dto';

export class RespSignUp400Dto extends ResponseErroGlobalSwagger {
  @ApiProperty({
    example: [
      'Name field cannot be empty',
      'Password field cannot be empty',
      'Email field cannot be empty',
      'The password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character.',
    ],
  })
  message: any;
}
