import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { lowerCaseTransformer } from "src/utils/lower-case.transformer";

export class RegisterDto {
  @ApiProperty({ example: 'kamilmysliwiec' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'Lq5kA@example.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: '12345678' })
  password: string;
}