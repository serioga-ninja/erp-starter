import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { type FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    switch (true) {
      case exception instanceof NotFoundException:
        status = HttpStatus.NOT_FOUND;
        message = 'Resource not found';
        break;
      case exception instanceof HttpException:
        status = exception.getStatus();
        message = exception.getResponse();
        break;
    }

    console.log(exception);

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
