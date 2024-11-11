import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Gender } from "src/constant/enum.gender";
import { lowerCaseTransformer } from "src/utils/lower-case.transformer";

export class CreateProfileDto {
  // @Transform(lowerCaseTransformer)
  @ApiProperty({ example: 'john doe' })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty({
    example: 'Male',
    enum: Gender,
  })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({ example: '2000-04-28' })
  @IsNotEmpty()
  @IsString()
  birthDay: string;

  @ApiProperty({ example: 169 })
  @IsOptional()
  @IsNumber()
  height: number;

  @ApiProperty({ example: 60 })
  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsString()
  holoscope: string;

  @IsOptional()
  @IsString()
  zodiac: string;

  @ApiProperty({
    description: 'Attachments',
    type: 'array',
    items: {
      type: 'file',
      items: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  @IsOptional()
  images: any[];
}