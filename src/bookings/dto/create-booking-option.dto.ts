import { IsArray, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OptionDto } from "./booking-option.dto";

export class CreateBookingOptionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  @IsOptional()
  areaOptions?: OptionDto[];
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  @IsOptional()
  serviceOptions?: OptionDto[];
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  @IsOptional()
  extrasOptions?: OptionDto[];
}
