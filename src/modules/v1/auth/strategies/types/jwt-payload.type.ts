import { UserDomain } from 'src/modules/v1/user/domain/user.domain';

export type JwtPayloadType = Pick<UserDomain, 'id'> & {
  iat: number;
  exp: number;
};
