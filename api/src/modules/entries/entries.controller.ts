import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QueryFindAllDto } from './dto';
import { EntriesService } from './entries.service';
import { Prisma } from '@prisma/client';
import {
  change_body_entrie,
  compare_word,
  pagination_helper,
  pagination_prisma,
} from 'src/helper';
import { JwtPayload } from 'src/interface/jwt-payload';
import {
  DictionaryService,
  FavoriteService,
  HistoryService,
} from 'src/services';
import { opt_valid_word } from './utils/opt_valid_word';
@Injectable()
export class EntriesController {
  constructor(
    private readonly entries: EntriesService,
    private readonly free_dictionary: DictionaryService,
    private readonly history: HistoryService,
    private readonly favorite_service: FavoriteService,
  ) {}
  async find_all(query: QueryFindAllDto) {
    const { limit, page, search, order } = query;
    const params: Prisma.entriesFindManyArgs = {
      orderBy: {
        entrie: 'asc',
      },
      select: {
        entrie: true,
      },
      ...pagination_prisma(+limit, +page),
    };
    if (order) params.orderBy = order;
    if (search)
      params.where = {
        entrie: {
          contains: search,
          mode: 'insensitive'
        },
      };
    const { rows, count } = await this.entries.find_all(params);
    const data = pagination_helper(
      page,
      limit,
      count,
      rows.map(({ entrie }) => entrie),
    );
    if (!search || page !== 1) return data;
    const isWord = data.results.some((row) => compare_word(row, search));
    if (isWord) {
      const ind = data.results.findIndex((ind) => compare_word(ind, search));
      const item = String(data.results[ind]);
      data.results.splice(ind, 1);
      data.results.splice(0, 0, item);
      return data;
    }
    const word = await this.entries.find_one(search, {
      select: { entrie: true },
    });
    if (!word) return data;
    data.results.pop();
    data.results.unshift(word.entrie);
    return data;
  }
  async valid_word(word: string, user?: JwtPayload) {
    word = word.trim();
    let opt: Prisma.entriesFindFirstArgs | undefined = undefined;
    if (user) {
      opt = opt_valid_word(user);
    }
    const entrie = await this.entries.find_one(word, opt);
    if (!entrie) throw new NotFoundException('No word found');
    return entrie;
  }
  async find_one(word: string, user: JwtPayload) {
    const entrie = await this.valid_word(word, user);
    let entries = [];
    try {
      const { data } = await this.free_dictionary.search_in_free_dictionary(
        encodeURIComponent(word),
      );
      entries = data;
    } catch {}

    if (!entries?.length) {
      throw new NotFoundException('No definition found for word');
    }
    const resp = entries.pop();
    resp.meanings.push(...entries.flatMap((item) => item.meanings));
    await this.history.create({
      id_entrie: entrie.id_entrie,
      id_user: user.id_user,
    });
    const body = change_body_entrie(resp);
    const { entries_fav, history_read_entrie } = entrie as any;
    if (entries_fav[0]) {
      const fav = entries_fav[0];
      body.fav = {
        id_entries_fav: fav.id_entries_fav,
        created_at: fav.created_at,
      };
    }
    if (history_read_entrie[0]) {
      const history = history_read_entrie[0];
      body.history = {
        id_history_read_entrie: history.id_history_read_entrie,
        created_at: history.created_at,
      };
    }
    return body;
  }

  async favorite(word: string, user: JwtPayload) {
    const entrie = await this.valid_word(word);
    const favorite = await this.favorite_service.find_one({
      id_entrie: entrie.id_entrie,
      id_user: user.id_user,
    });
    if (favorite)
      throw new BadRequestException(
        'The word in question is already among the favorite items.',
      );
    await this.favorite_service.create({
      id_entrie: entrie.id_entrie,
      id_user: user.id_user,
    });
  }

  async unfavorite(word: string, user: JwtPayload) {
    const entrie = await this.valid_word(word);
    const favorite = await this.favorite_service.find_one({
      id_entrie: entrie.id_entrie,
      id_user: user.id_user,
    });
    if (!favorite) throw new NotFoundException('No word found favorited');
    await this.favorite_service.delete({
      id_entries_fav: favorite.id_entries_fav,
    });
  }
}
