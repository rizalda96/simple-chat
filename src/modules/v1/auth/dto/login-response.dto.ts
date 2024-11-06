import { ApiProperty } from "@nestjs/swagger";
import { UserDomain } from "../../user/domain/user.domain";
import { Exclude, Expose } from "class-transformer";

export class LoginResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  @Expose()
  tokenExpires: number;

  @ApiProperty({
    type: () => UserDomain,
  })
  user: UserDomain;
}