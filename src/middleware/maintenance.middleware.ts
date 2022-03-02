import { HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// メンテナンスモードでも通すパス
const throughPathList = ['/api/health'];

export class MaintenanceMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): any {
    const { originalUrl } = request;
    if (
      !throughPathList.includes(originalUrl) &&
      process.env.IS_MAINTENANCE === 'true'
    ) {
      throw new HttpException(
        'SERVICE_UNAVAILABLE',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    next();
  }
}
