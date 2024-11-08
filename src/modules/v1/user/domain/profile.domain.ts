import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Gender } from "src/constant/enum.gender";
import { ImageProfileEntity } from "../entities/image-profile.entity";

export class ProfileDomain {
  @ApiProperty({
    type: Array,
  })
  images: ImageProfileEntity[];

  @ApiProperty({
    type: String,
  })
  fullname: string;

  @ApiProperty({
    enum: Gender,
  })
  gender: string;

  @ApiProperty({
    type: Date,
    format: 'date',
  })
  birthDay: Date;

  @ApiProperty({
    type: String,
  })
  holoscope: string;

  @ApiProperty({
    type: String,
  })
  zodiac: string;

  @ApiProperty({
    type: Number,
  })
  height: number;

  @ApiProperty({
    type: Number,
  })
  weight: number;
}