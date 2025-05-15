import { Body, Controller, Param, Query } from '@nestjs/common';
import { EntriesController } from './entries.controller';
import { ApiTags } from '@nestjs/swagger';
import { d_find_all, d_find_one, d_favorite, d_unfavorite } from './decorator';
import { QueryFindAllDto } from './dto';
import { getUser } from 'src/decorator';
import { JwtPayload } from 'src/interface/jwt-payload';

@Controller('entries/end')
@ApiTags('Palavras')
export class EntriesRouter {
  constructor(private readonly entries: EntriesController) {}
  @d_find_all()
  async find_all(@Query() query: QueryFindAllDto) {
    return await this.entries.find_all(query);
  }

  @d_find_one()
  async find_one(@Param('word') word: string, @getUser() user: JwtPayload) {
    return await this.entries.find_one(word, user);
  }

  @d_favorite()
  async favorite(@Param('word') word: string, @getUser() user: JwtPayload) {
    return await this.entries.favorite(word, user);
  }
  @d_unfavorite()
  async unfavorite(@Param('word') word: string, @getUser() user: JwtPayload) {
    return await this.entries.unfavorite(word, user);
  }
}
