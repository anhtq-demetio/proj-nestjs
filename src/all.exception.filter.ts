import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from './logger/logger.service';

/* eslint-disable @typescript-eslint/ban-ts-comment */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'エラーが発生しました';
    if (exception instanceof HttpException) {
      status = exception.getStatus();

      // class-validatorのisEmailのエラー形式がresponse.messageをエラーメッセージとするので存在する場合はそれを使う
      if (status === 400) {
        message =
          // @ts-ignore
          exception.getResponse().message && exception.getResponse().message[0]
            ? // @ts-ignore
              exception.getResponse().message[0]
            : exception.message;
      } else {
        message = exception.message;
      }
    } else {
      // 想定外のエラーが発生した場合はwarnで落とす
      new Logger().warn(exception.toString());
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
