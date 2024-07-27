import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class OptionDto {
  @ApiProperty({ example: "Areaname" })
  @IsString()
  name: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  value: number;
}
