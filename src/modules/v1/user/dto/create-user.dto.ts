import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { lowerCaseTransformer } from "src/utils/lower-case.transformer";

export class CreateUserDto {
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  rememberToken: string | null;

  @IsOptional()
  lastLogin: Date | null;
}
