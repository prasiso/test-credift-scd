import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Favorite } from './interface/favorite';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ id_entrie, id_user }) {
    return await this.prisma.entries_fav.create({
      data: {
        id_entrie,
        id_user,
      },
    });
  }

  async find_one({ id_entrie, id_user }) {
    return await this.prisma.entries_fav.findFirst({
      where: {
        id_entrie,
        id_user,
      },
    });
  }
  async find_all(
    params: Prisma.entries_favFindManyArgs,
  ): Promise<{ count: number; rows: Favorite[] }> {
    const { where, ...rest } = params;
    const [count, rows] = await Promise.all([
      this.prisma.entries_fav.count({ where }),
      this.prisma.entries_fav.findMany({ ...rest, where }),
    ]);
    return { count, rows };
  }

  async delete({ id_entries_fav }) {
    return await this.prisma.entries_fav.delete({
      where: {
        id_entries_fav,
      },
    });
  }
}
