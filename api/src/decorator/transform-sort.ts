import { Transform } from 'class-transformer';

export const Sort = () => {
  return Transform(({ value }) => {
    if (!value) return undefined;
    const [field, order] = value?.split('-');
    return { [field]: order };
  });
};
