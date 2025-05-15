import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class EntriesRepository {
  constructor(private readonly prisma: PrismaService) {}
  async find_all(params: Prisma.entriesFindManyArgs) {
    return await this.prisma.entries.findMany(params);
  }

  async find_one(params: Prisma.entriesFindFirstArgs) {
    return await this.prisma.entries.findFirst(params);
  }


  async count(params: Prisma.entriesCountArgs) {
    return await this.prisma.entries.count(params);
  }
}
