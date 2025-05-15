import { entries_fav, entries } from '@prisma/client';

export interface Favorite extends Partial<entries_fav> {
  entries?: entries;
}
