import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class BookingAddressDto {
  @ApiProperty({ example: "New York" })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: "123 Main St" })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: "Apt 13" })
  @IsString()
  @IsOptional()
  aptSuite?: string;

  @ApiProperty({ example: "10001" })
  @IsString()
  @IsNotEmpty()
  zip: string;

  @ApiProperty({ example: "NY" })
  @IsString()
  @IsNotEmpty()
  state: string;
}
