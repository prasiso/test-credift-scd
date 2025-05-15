import { Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserController } from './user.controller';
import { d_favorite, d_history, d_user_me } from './decorator';
import { getUser } from 'src/decorator';
import { JwtPayload } from 'src/interface/jwt-payload';
import { QueryFindAllDto } from './dto';

@Controller('user/me')
@ApiTags('Usuário')
export class UserRouter {
  constructor(private readonly user: UserController) {}
  @d_user_me()
  async user_me(@getUser() user: JwtPayload) {
    return await this.user.user_me(user);
  }

  @d_history()
  async history(@getUser() user: JwtPayload, @Query() query: QueryFindAllDto){
    return await this.user.history(query, user)
  }

  @d_favorite()
  async favorite(@getUser() user: JwtPayload, @Query() query: QueryFindAllDto){
    return await this.user.favorite(query, user)
  }
}
