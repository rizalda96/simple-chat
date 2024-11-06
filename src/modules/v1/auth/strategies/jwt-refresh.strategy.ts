import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { JwtRefreshPayloadType } from './types/jwt-refresh-payload.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService<AllConfigType>) {
    const config = configService.get('auth', { infer: true })
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.refreshSecret,
    });
  }

  public validate(
    payload: JwtRefreshPayloadType,
  ): JwtRefreshPayloadType {
    if (!payload.email || !payload.username) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
