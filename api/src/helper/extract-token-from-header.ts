import { Request } from 'express';

export const extract_token_from_header = (req: Request) => {
  const [type, token] = req.headers?.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};
