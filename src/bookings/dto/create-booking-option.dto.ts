import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OptionDto } from "./booking-option.dto";

export class CreateBookingOptionDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  areaOptions: OptionDto[];
  
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  serviceOptions: OptionDto[];
  
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  extrasOptions: OptionDto[];
  
  @IsNumber()
  @IsNotEmpty()
  base: number;
  
  @IsNumber()
  @IsNotEmpty()
  coff: number;
  
  @IsNumber()
  @IsNotEmpty()
  bathPrice: number;
}
