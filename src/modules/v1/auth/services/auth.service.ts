import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { LoginResponseDto } from '../dto/login-response.dto';
import * as bcrypt from 'bcrypt';
import ms from 'ms';
import { RegisterDto } from '../dto/register.dto';
import { UserDomain } from '../../user/domain/user.domain';
import { UserEntity } from '../../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AllConfigType } from 'src/config/config.type';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshPayloadType } from '../strategies/types/jwt-refresh-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService<AllConfigType>,
  ) {}

  async login(uname: string, pass: string) : Promise<LoginResponseDto> {
    // check if uname is email or username
    const isEmail = /\S+@\S+\.\S+/.test(uname);
    const identifier = isEmail ? 'email' : 'username';

    const user = await this.userService.findOneUser(identifier, uname);

    if (!user.password) throw new UnprocessableEntityException('Password not set');
    if (!user.isActive) throw new UnauthorizedException('Inactive user');
     
    const isValidPassword = await bcrypt.compare(
      pass,
      user.password,
    );
    if (!isValidPassword) throw new UnprocessableEntityException('Incorrect password');
    
    await this.updateLastLogin(user);
    const { token, refreshToken, tokenExpires } = await this.getTokensData({ id: user.id, email: user.email, username: user.username });
    const { password, createdAt, updatedAt, ...result } = user;
    
    return {
      token,
      refreshToken,
      tokenExpires,
      user: result,
    };
  }

  async updateLastLogin(user: UserEntity) : Promise<void> {    
    user.lastLogin = new Date();
    user.updatedAt = new Date();
    
    await this.userService.updateUser(user.id, user);
  }

  async register(request: RegisterDto) : Promise<LoginResponseDto> {
    // return await this.userService.createUser(request);
    const user = await this.userService.createUser({
      ...request,
      isActive: true,
    });

    await this.updateLastLogin(user);
    const { token, refreshToken, tokenExpires } = await this.getTokensData({ id: user.id, email: user.email, username: user.username });
    const { password, createdAt, updatedAt, ...result } = user;

    return {
      token,
      refreshToken,
      tokenExpires,
      user: result,
    };
  }

  async refreshToken(data: Pick<JwtRefreshPayloadType, 'email' | 'username'>) : Promise<Omit<LoginResponseDto, 'user'>> {
    const { email, username } = data;

    if (!email || !username) throw new UnauthorizedException();

    const user = await this.userService.findOneUser('email', email);
    if (!user) throw new UnauthorizedException();
    
    const { token, refreshToken, tokenExpires } = await this.getTokensData({ id: user.id, email: user.email, username: user.username });

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }

  private async getTokensData(data: {
    id: UserDomain['id'];
    email: UserDomain['email'];
    username: UserDomain['username'];
  }) {
    const config = this.configService.getOrThrow('auth', { infer: true })
    
    const tokenExpiresIn = config.expires
    const tokenExpires = Date.now() + ms(tokenExpiresIn);
    
    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
        },
        {
          secret: config.secret,
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          email: data.email,
          username: data.username,
        },
        {
          secret: config.refreshSecret,
          expiresIn: config.refreshExpires,
        },
      ),
    ]);
    
    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}
