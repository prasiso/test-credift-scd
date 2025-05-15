import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user';
import { SigninDto, SignUpDto } from './dto';
import { HashService } from 'src/services';
import { AuthService } from './auth.service';

@Injectable()
export class AuthController {
  constructor(
    private readonly user: UserService,
    private readonly auth: AuthService,
    private readonly hash: HashService,
  ) {}
  async sign_up(body: SignUpDto) {
    const user = await this.user.find_one(undefined, {
      where: {
        email: body.email,
      },
    });
    if (user)
      throw new ConflictException(
        'The email address provided is already registered in our system. Please use another email address.',
      );
    const data = await this.user.create(body);
    return await this.auth.sign_in(data);
  }

  async sign_in(body: SigninDto) {
    const user = await this.user.find_one(undefined, {
      where: {
        email: {
          equals: body.email,
          mode: 'insensitive'
        },
      },
    });
    if (!user)
      throw new NotFoundException(
        'The email address provided was not found in our system. Please check and try again.',
      );
    const is_valid_pass = await this.hash.compare(body.password, user.password);
    if (!is_valid_pass)
      throw new NotFoundException('Passwords do not match. Please try again.');
    return await this.auth.sign_in(user);
  }
}
