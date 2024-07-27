import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OptionDto } from "./booking-option.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookingOptionDto {
  @ApiProperty({ type: OptionDto })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  areaOptions: OptionDto[];
  
  @ApiProperty({ type: OptionDto })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  serviceOptions: OptionDto[];
  
  @ApiProperty({ type: OptionDto })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  extrasOptions: OptionDto[];
  
  @ApiProperty({ type: OptionDto })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  discountOptions: OptionDto[];
  
  @ApiProperty({ example: 111 })
  @IsNumber()
  @IsNotEmpty()
  base: number;
  
  @ApiProperty({ example: 0.25 })
  @IsNumber()
  @IsNotEmpty()
  coff: number;
  
  @ApiProperty({ example: 69 })
  @IsNumber()
  @IsNotEmpty()
  bathPrice: number;
}
