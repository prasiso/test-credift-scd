import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtPayload } from 'src/interface/jwt-payload';
import { QueryFindAllDto } from './dto/query-find-all.dto';
import { pagination_helper, pagination_prisma } from 'src/helper';
import { Prisma } from '@prisma/client';
import { FavoriteService, HistoryService } from 'src/services';
@Injectable()
export class UserController {
  constructor(
    private readonly user_service: UserService,
    private readonly history_service: HistoryService,
    private readonly fav_service: FavoriteService,
  ) {}
  async user_me(user: JwtPayload) {
    const data = await this.user_service.find_one(user.id_user, {
      omit: { password: true },
    });
    if (!data) throw new NotFoundException('No user found');
    return data;
  }

  async history(query: QueryFindAllDto, user: JwtPayload) {
    const { limit, page, search, order } = query;
    const params: Prisma.history_read_entrieFindManyArgs = {
      orderBy: {
        created_at: 'desc',
      },
      where: {
        id_user: user.id_user,
      },
      select: {
        entries: {
          select: {
            entrie: true,
          },
        },
        created_at: true,
      },
      ...pagination_prisma(+limit, +page),
    };
    if (order) {
      const [key, value] = Object.entries(order)[0];
      params.orderBy =
        key === 'word'
          ? {
              entries: {
                entrie: value as 'desc' | 'asc',
              },
            }
          : order;
    }

    if (search)
      params.where.entries = {
        entrie: {
          contains: search,
          mode: 'insensitive'
        },
      };
    const { rows, count } = await this.history_service.find_all(params);
    const resp = rows.map((row) => ({
      word: row.entries.entrie,
      added: row.created_at,
    }));
    const data = pagination_helper(page, limit, count, resp);
    return data;
  }

  async favorite(query: QueryFindAllDto, user: JwtPayload) {
    const { limit, page, search, order } = query;
    const params: Prisma.entries_favFindManyArgs = {
      orderBy: {
        created_at: 'desc',
      },
      where: {
        id_user: user.id_user,
      },
      select: {
        entries: {
          select: {
            entrie: true,
          },
        },
        created_at: true,
      },
      ...pagination_prisma(+limit, +page),
    };
    if (order) {
      const [key, value] = Object.entries(order)[0];
      params.orderBy =
        key === 'word'
          ? {
              entries: {
                entrie: value as 'desc' | 'asc',
              },
            }
          : order;
    }

    if (search)
      params.where.entries = {
        entrie: {
          contains: search,
          mode: 'insensitive'
        },
      };
    const { rows, count } = await this.fav_service.find_all(params);
    const resp = rows.map((row) => ({
      word: row.entries.entrie,
      added: row.created_at,
    }));
    const data = pagination_helper(page, limit, count, resp);
    return data;
  }
}
