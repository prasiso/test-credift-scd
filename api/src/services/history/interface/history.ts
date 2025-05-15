import { history_read_entrie, entries } from '@prisma/client';

export interface History extends Partial<history_read_entrie> {
  entries?: entries;
}
