import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  private readonly salt_or_rounds = 10;
  async encrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt_or_rounds);
  }
  async compare(password: string, hash: string) {
    return await bcrypt.compareSync(password, hash);
  }
}
