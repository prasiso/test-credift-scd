import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsValidPassword } from 'src/decorator';

export class SignUpDto {
  @ApiProperty({ example: 'User 1' })
  @IsNotEmpty({ message: 'Name field cannot be empty' })
  name: string;

  @ApiProperty({ example: 'test' })
  @IsNotEmpty({ message: 'Password field cannot be empty' })
  @IsValidPassword()
  password: string;

  @ApiProperty()
  @IsEmail()
  @ApiProperty({ example: 'example@email.com' })
  @IsNotEmpty({ message: 'Email field cannot be empty' })
  email: string;
}
