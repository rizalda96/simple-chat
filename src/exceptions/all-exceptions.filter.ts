
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { AllConfigType } from 'src/config/config.type';
import { DtoValidationError } from './dto-exception.filter';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly configService: ConfigService<AllConfigType>
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const configApp = this.configService.get('app', { infer: true });

    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    

    const ctx = host.switchToHttp();

    // const httpStatus =
    //   exception instanceof HttpException
    //     ? exception.getStatus()
    //     : HttpStatus.INTERNAL_SERVER_ERROR;

    let httpStatus = 0;

      if (exception instanceof HttpException) {
        console.log(exception);
        
        httpStatus = exception.getStatus();
      } else {
        httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      }
        // ? 
        // : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception instanceof HttpException ? exception.message : configApp.nodeEnv === 'production' ? 'Internal Server Error' : (exception as any).message;
    
    if (exception instanceof DtoValidationError) {
      message = (exception as any).response.message;
    }

    const responseBody = {
      statusCode: httpStatus,
      success: false,
      // timestamp: new Date().toISOString(),
      // path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message
    };

    console.log(httpStatus);
    
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
