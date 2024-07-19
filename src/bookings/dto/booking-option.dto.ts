import { IsNumber, IsString } from "class-validator";

export class OptionDto {
  @IsString()
  name: string;

  @IsNumber()
  value: number;
}
