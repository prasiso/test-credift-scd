import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { History } from './interface/history'
@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) { }
  async create({ id_entrie, id_user }) {
    return await this.prisma.history_read_entrie.create({
      data: {
        id_entrie,
        id_user,
      },
    });
  }

  async find_all(
    params: Prisma.history_read_entrieFindManyArgs,
  ): Promise<{ count: number; rows: History[] }> {
    const { where, ...rest } = params;
    const [count, rows] = await Promise.all([
      this.prisma.history_read_entrie.count({ where }),
      this.prisma.history_read_entrie.findMany({ ...rest, where }),
    ]);
    return { count, rows };
  }
}
