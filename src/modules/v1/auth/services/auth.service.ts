import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { LoginResponseDto } from '../dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async login(email: string, pass: string) : Promise<LoginResponseDto> {
    const user = await this.userService.findOneUser(email);

    if (user?.password !== pass) throw new UnprocessableEntityException('Incorrect password');

    const { password, createdAt, updatedAt, ...result } = user;

    const token = 'token';
    const refreshToken = 'refreshToken';

    return {
      token,
      refreshToken,
      user: result,
    };
    // return result;
  }
}
