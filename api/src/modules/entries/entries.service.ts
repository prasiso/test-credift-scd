import { Injectable } from '@nestjs/common';
import { EntriesRepository } from './entries.repository';
import { Prisma } from '@prisma/client';
@Injectable()
export class EntriesService {
  constructor(private readonly entries: EntriesRepository) {}
  async find_all(params: Prisma.entriesFindManyArgs) {
    const { where, ...rest } = params;
    const [count, rows] = await Promise.all([
      this.entries.count({ where }),
      this.entries.find_all({ ...rest, where }),
    ]);
    return { count, rows };
  }

  async find_one(word?: string, params?: Prisma.entriesFindFirstArgs) {
    if (!word && !params) return null;
    params ??= {};
    params.where ??= {};
    if (word)
      params.where.entrie = {
        equals: word,
        mode: 'insensitive',
      };
    return await this.entries.find_one(params);
  }
}
