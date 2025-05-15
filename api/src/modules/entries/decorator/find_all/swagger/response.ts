import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseGlobalSwagger } from 'src/decorator/response_global_swagger';
import {
  RespFindAllEntries200Dto,
  RespFindAllEntries400Dto,
} from './dto-response';
export const ResponseSwagger = () => {
  return applyDecorators(
    ResponseGlobalSwagger(false),
    ApiResponse({
      status: 400,
      type: RespFindAllEntries400Dto,
    }),
    ApiResponse({
      status: 200,
      type: RespFindAllEntries200Dto,
    }),
  );
};
