import { Prisma } from '@prisma/client';
export interface create_arg {
  include?: Prisma.userInclude;
  select?: Prisma.userSelect;
  omit?: Prisma.userOmit
}
