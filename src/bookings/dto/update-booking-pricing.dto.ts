import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UpdatePricingDto {
  @ApiProperty({ example: 130 })
  @IsNumber()
  @IsOptional()
  base?: number;

  @ApiProperty({ example: 0.33 })
  @IsNumber()
  @IsOptional()
  coff?: number;

  @ApiProperty({ example: 70 })
  @IsNumber()
  @IsOptional()
  bathPrice?: number;
}
