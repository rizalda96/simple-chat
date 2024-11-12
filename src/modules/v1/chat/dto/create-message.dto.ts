import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {
  @ApiProperty({ example: 'start chat message' })
  @IsNotEmpty()
  message: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  fromUserId: number;

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  toUserId: number;
}
