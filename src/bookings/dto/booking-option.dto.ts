import { IsString } from "class-validator";

export class OptionDto {
  @IsString()
  value: string;

  @IsString()
  label: string;
}
