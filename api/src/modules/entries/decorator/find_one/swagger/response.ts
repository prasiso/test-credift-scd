import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseGlobalSwagger } from 'src/decorator/response_global_swagger';
import {
  RespFindOneEntrie200Dto,
  RespFindOneEntrie404Dto,
} from './dto-response';
export const ResponseSwagger = () => {
  return applyDecorators(
    ResponseGlobalSwagger(),
    ApiResponse({
      status: 400,
      type: RespFindOneEntrie404Dto,
    }),
    ApiResponse({
      status: 200,
      type: RespFindOneEntrie200Dto,
    }),
  );
};
