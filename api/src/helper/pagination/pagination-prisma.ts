export const pagination_prisma = (limit, page) => {
  if (!limit || !page) return {};
  return {
    skip: (page - 1) * limit || 0,
    take: Number(limit),
  };
};
