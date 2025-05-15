import { Prisma } from '@prisma/client';
import { JwtPayload } from 'src/interface/jwt-payload';

export const opt_valid_word = (user: JwtPayload): Prisma.entriesFindFirstArgs => {
  return {
    include: {
      entries_fav: {
        where: {
          id_user: user.id_user,
        },
        orderBy: {
          id_entries_fav: 'desc',
        },
        take: 1,
      },
      history_read_entrie: {
        distinct: 'id_user',
        orderBy: {
          id_history_read_entrie: 'desc',
        },
        take: 1,
        where: {
          id_user: user.id_user,
        },
      },
    },
  };
};
