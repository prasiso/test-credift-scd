import { Body, Controller } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SigninDto, SignUpDto } from './dto';
import { d_sign_up } from './decorator';
import { ApiTags } from '@nestjs/swagger';
import { d_sign_in } from './decorator/sign_in';

@Controller('auth')
@ApiTags('Auth')
export class AuthRouter {
  constructor(private readonly auth: AuthController) {}
  @d_sign_up()
  async sign_up(@Body() body: SignUpDto) {
    return await this.auth.sign_up(body);
  }

  @d_sign_in()
  async sign_in(@Body() body: SigninDto) {
    return await this.auth.sign_in(body);
  }
}
