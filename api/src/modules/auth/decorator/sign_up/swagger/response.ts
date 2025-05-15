import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseGlobalSwagger } from 'src/decorator/response_global_swagger';
import { Resp200Dto, RespSignUp400Dto, RespSignUp409Dto } from './dto-response';
export const ResponseSwagger = () => {
  return applyDecorators(
    ResponseGlobalSwagger(false),
    ApiResponse({
      status: 200,
      type: Resp200Dto,
    }),
    ApiResponse({
      status: 400,
      type: RespSignUp400Dto
    }),
    ApiResponse({
      status: 409,
      type: RespSignUp409Dto
    })
  );
};
