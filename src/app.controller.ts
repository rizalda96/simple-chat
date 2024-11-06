import { Controller, Get, HttpException } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    try {
      return { 
        message: 'hello world!',
      };
    } catch (error) {
      throw new HttpException('error', 500)
    }
  }
}
