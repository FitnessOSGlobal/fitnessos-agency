import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LoggerService } from '../logger';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

    catch(exception: unknown, host: ArgumentsHost): void {
  const ctx = host.switchToHttp();

  const request = ctx.getRequest<Request>();
  const response = ctx.getResponse<Response>();

  const isHttpException = exception instanceof HttpException;

  const status = isHttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;

  const exceptionResponse = isHttpException
    ? exception.getResponse()
    : null;

  let message = 'Internal Server Error';
  let details: unknown = null;

  if (typeof exceptionResponse === 'string') {
    message = exceptionResponse;
  } else if (
    exceptionResponse &&
    typeof exceptionResponse === 'object'
  ) {
    const res = exceptionResponse as Record<string, unknown>;

    if (typeof res.message === 'string') {
      message = res.message;
    } else if (Array.isArray(res.message)) {
      message = 'Validation failed';
      details = res.message;
    }

    if (res.details) {
      details = res.details;
    }
  }

  this.logger.error(exception);

  response.status(status).json({
    success: false,
    statusCode: status,
    timestamp: new Date().toISOString(),
    path: request.url,
    error: {
      code: HttpStatus[status] ?? 'UNKNOWN_ERROR',
      message,
      details,
    },
  });
}
}