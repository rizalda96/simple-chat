import { UserDomain } from 'src/modules/v1/user/domain/user.domain';

export type JwtRefreshPayloadType = {
  email: UserDomain['email'];
  username: UserDomain['username'];
  iat: number;
  exp: number;
};
