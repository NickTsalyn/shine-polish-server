import { IsNumber, IsOptional } from "class-validator";

export class UpdatePricingDto {
  @IsNumber()
  @IsOptional()
  base?: number;

  @IsNumber()
  @IsOptional()
  coff?: number;

  @IsNumber()
  @IsOptional()
  bathPrice?: number;
}
