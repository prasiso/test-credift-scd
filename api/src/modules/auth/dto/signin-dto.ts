import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsValidPassword } from 'src/decorator';

export class SigninDto {
  @ApiProperty({ example: 'test' })
  @IsNotEmpty({ message: 'Password field cannot be empty' })
  password: string;

  @ApiProperty()
  @IsEmail()
  @ApiProperty({ example: 'example@email.com' })
  @IsNotEmpty({ message: 'Email field cannot be empty' })
  email: string;
}
