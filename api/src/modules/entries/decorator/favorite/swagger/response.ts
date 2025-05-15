import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseGlobalSwagger } from 'src/decorator/response_global_swagger';
import {
  RespFavoriteEntries400Dto,
  RespFavoriteEntries404Dto,
} from './dto-response';
export const ResponseSwagger = () => {
  return applyDecorators(
    ResponseGlobalSwagger(),
    ApiResponse({
      status: 404,
      type: RespFavoriteEntries404Dto,
    }),
    ApiResponse({
      status: 400,
      type: RespFavoriteEntries400Dto,
    }),
  );
};
