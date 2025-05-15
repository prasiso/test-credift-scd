import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Resp401GlobalSwagger, Resp500GlobalSwagger } from './dto';
export const ResponseGlobalSwagger = (e401 = true, e500 = true) => {
  const opt: (MethodDecorator | ClassDecorator)[] = [];
  if (e500)
    opt.push(
      ApiResponse({
        status: 500,
        type: Resp500GlobalSwagger,
      }),
    );
  if (e401) opt.push(ApiResponse({ status: 401, type: Resp401GlobalSwagger }));

  return applyDecorators(...opt);
};
