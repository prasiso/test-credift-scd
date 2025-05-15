import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseGlobalSwagger } from 'src/decorator/response_global_swagger';
export const ResponseSwagger = () => {
  return applyDecorators(
    ResponseGlobalSwagger(),
    ApiResponse({
      status: 404,
      content: {
        'application/json': {
          examples: {
            not_found_word: {
              summary: 'No word found',
              value: {
                timestamp: '2025-05-10T20:17:37.186Z',
                path: '/',
                status: 400,
                message: 'No word found',
              }
            },
            not_found_word_favorite: {
              summary: 'No word found favorited',
              value: {
                timestamp: '2025-05-10T20:17:37.186Z',
                path: '/',
                status: 400,
                message: 'No word found favorited',
              }
            }
          }
        },
      },
    }),
  );
};
