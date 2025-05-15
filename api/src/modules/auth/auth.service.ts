import { Injectable } from '@nestjs/common';
import { JwtService } from 'src/services/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}
  async sign_in(user) {
    delete user.password;
    const token = await this.jwt.sign(user);
    return { ...user, token };
  }
}
