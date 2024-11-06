import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { UserEntity } from '../../user/entities/user.entity';
import { NullableType } from 'src/utils/types/nullable.type';
import { UserDomain } from '../../user/domain/user.domain';
import { LoginResponseDto } from '../dto/login-response.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/decorators/response-message.decorator';
import { RegisterDto } from '../dto/register.dto';

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
  @ResponseMessage('Login successful')
  async login(@Body() request: LoginDto): Promise<LoginResponseDto> {
    const { uname, password } = request;
    
    return await this.authService.login(uname, password);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    type: UserDomain,
  })
  @ResponseMessage('Register successful')
  @Post('register')
  async register(@Body() request: RegisterDto): Promise<NullableType<RegisterDto>> {
    return await this.authService.register(request);
  }
}
