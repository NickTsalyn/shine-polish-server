import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class PromoCodeDto {
  @ApiProperty({ example: "Welcome-S&P-Promo" })
  @IsString()
  name: string;

  @ApiProperty({ example: 0.1 })
  @IsNumber()
  discount: number;
}

export class PromoCodeResDto {
  @ApiProperty({ example: "Welcome-S&P-Promo" })
  @IsString()
  name: string;

  @ApiProperty({ example: "WELCOME-S&P-PROMO-04SP05SP" })
  @IsString()
  value: string;

  @ApiProperty({ example: 0.1 })
  @IsNumber()
  discount: number;

  @ApiProperty({ example: "2024-10-10T10:10:10.039Z" })
  @IsString()
  exp: string;
}