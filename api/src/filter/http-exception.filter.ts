import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class CustomExceptionFilter extends BaseExceptionFilter {
  constructor() {
    super();
  }
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
      message = message.message ?? message;
    } else {
      message =
        '⚠️ Ocorreu um erro inesperado. Estamos trabalhando para resolver o mais rápido possível.';
    }
    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      status,
    });
  }
}
