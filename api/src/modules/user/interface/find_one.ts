import { Prisma } from '@prisma/client';
export interface find_one_arg {
  where?: Prisma.userWhereInput;
  include?: Prisma.userInclude;
  select?: Prisma.userSelect;
  omit?: Prisma.userOmit
}
