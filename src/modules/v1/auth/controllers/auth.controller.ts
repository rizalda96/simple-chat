import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { UserEntity } from '../../user/entities/user.entity';
import { NullableType } from 'src/utils/types/nullable.type';
import { UserDomain } from '../../user/domain/user.domain';
import { LoginResponseDto } from '../dto/login-response.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/decorators/response-message.decorator';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginResponseDto,
  })
  @Post('login')
  @ResponseMessage('Login successfulasd')
  async login(@Body() signInDto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(signInDto.email, signInDto.password);
    // const user: UserEntity = await this.authService.login(signInDto.email, signInDto.password);

    // return {
    //   data: user,
    //   message: 'Login successful',
    // };
  }
}
