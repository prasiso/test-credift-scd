import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { find_one_arg } from './interface';
import { Prisma } from '@prisma/client';
import { HashService } from 'src/services';
@Injectable()
export class UserService {
  constructor(
    private readonly user_service: UserRepository,
    private readonly hash: HashService,
  ) { }
  async find_one(id?: number, params?: find_one_arg) {
    if (!id && !params) return null;
    params ??= {};
    params.where ??= {};
    if (id) params.where.id_user = Number(id);
    return await this.user_service.find_one(params);
  }

  async create(body: Prisma.userCreateInput) {
    body.password = await this.hash.encrypt(body.password);
    return await this.user_service.create(body);
  }
}
