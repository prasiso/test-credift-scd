import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../../interface/jwt-payload';
import { JwtService as nestJwt } from '@nestjs/jwt';
@Injectable()
export class JwtService {
  constructor(private readonly jwt: nestJwt) {}
  async sign(paylaod: JwtPayload): Promise<string> {
    const token = await this.jwt.signAsync(paylaod);
    return token;
  }

  async verify(token: string): Promise<JwtPayload> {
    const payload: JwtPayload = await this.jwt.verifyAsync(token);
    return payload;
  }
}
