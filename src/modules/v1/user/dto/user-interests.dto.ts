import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Gender } from "src/constant/enum.gender";
import { lowerCaseTransformer } from "src/utils/lower-case.transformer";

export class UserInterestsDto {
  @ApiProperty({
    example: ['Football', 'Music'],
    isArray: true,
    required: true
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  interests: string[];
}