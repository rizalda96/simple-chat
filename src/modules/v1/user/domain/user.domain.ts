import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class UserDomain {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: String,
    example: 'Lq5kA@example.com'
  })
  @Expose()
  email: string;

  @ApiProperty({
    type: String,
  })
  password?: string;

  @ApiProperty({
    type: Boolean,
  })
  isActive: boolean;

  @ApiProperty()
  lastLogin: Date;

  @ApiProperty()
  rememberToken: string | null;
}