import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
 } from '@nestjs/common';
 import { Observable, map } from 'rxjs';
 
 export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> { 
    const req = context.switchToHttp().getRequest();    
    const method = req.method;
    const url = req.url;
    const now = Date.now();
    const params = req.params;
    const query = req.query;
    const body = req.body;
    return next.handle().pipe(
      map((data) => {
        Logger.log(
          `${method} ${url} ${Date.now() - now}ms -> request params: ${JSON.stringify(params)} request query: ${JSON.stringify(query)} request body: ${JSON.stringify(body)}`,
          context.getClass().name,
        );
        return data;
      }),
    );
  }
 }