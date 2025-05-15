import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { find_one_arg } from './interface';
import { Prisma } from '@prisma/client';
import { create_arg } from './interface/create';
@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }
  async find_one(arg: find_one_arg) {
    return await this.prisma.user.findFirst(arg);
  }
  async create(data: Prisma.userCreateInput, arg?: create_arg) {
    return await this.prisma.user.create({ data, ...arg });
  }
}
