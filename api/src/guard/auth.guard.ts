import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from 'src/services/jwt';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { extract_token_from_header } from 'src/helper';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const is_public = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (is_public) return true;
    const req = context.switchToHttp().getRequest();
    const token = extract_token_from_header(req);
    if (!token) throw new UnauthorizedException('Não autorizado');
    try {
      const payload = await this.jwt.verify(token);
      req['user'] = payload;
      return true;
    } catch (error: any) {
      throw new UnauthorizedException('Não autorizado');
    }
  }
}
