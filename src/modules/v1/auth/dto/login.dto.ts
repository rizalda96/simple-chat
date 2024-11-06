import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { lowerCaseTransformer } from "src/utils/lower-case.transformer";

export class LoginDto {
  @ApiProperty({ example: 'Lq5kA@example.com / kamilmysliwiec' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  uname: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: '12345678' })
  password: string;
}
