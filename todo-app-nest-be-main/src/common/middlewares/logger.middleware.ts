import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: Function) {
    try {
      const offuscateRequest = JSON.parse(JSON.stringify(req.body));
      if (offuscateRequest.password) offuscateRequest.password = "*******";
      if (offuscateRequest.newPassword) offuscateRequest.newPassword = "*******";
      if (offuscateRequest.currentPassword) offuscateRequest.currentPassword = "*******";
      
      if (Object.keys(offuscateRequest).length > 0) {
        console.log(new Date().toString() + ' - [Request] ' + req.baseUrl + " - " + JSON.stringify(offuscateRequest));
      }
    } catch (error) {
      console.error(error);
    }
    next();
  }
}
