import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { BookingAddressDto } from "./booking-address.dto";
import { ApiProperty } from "@nestjs/swagger";
import { AppValidation } from "src/common/constants";

export class CreateBookingDto {
  @ApiProperty({ example: "alvaro_capibara@example.com" })
  @IsEmail({}, { message: AppValidation.IS_EMAIL })
  // @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "Alvaro" })
  @IsString()
  // @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Capibara" })
  @IsString()
  // @IsNotEmpty()
  surname: string;

  @ApiProperty({ example: "+1 234 567 890" })
  @IsString()
  // @IsNotEmpty()
  phone: string;

  @ApiProperty({ type: BookingAddressDto, })
  @ValidateNested()
  @Type(() => BookingAddressDto)
  address: BookingAddressDto;

  @ApiProperty({ example: "Downtown" })
  @IsString()
  // @IsNotEmpty()
  area: string;

  @ApiProperty({ example: "2022-01-01" })
  @IsString()
  // @IsNotEmpty()
  selectedDate: string;

  @ApiProperty({ example: "16:00" })
  @IsString()
  // @IsNotEmpty()
  time: string;

  @ApiProperty({ example: "2" })
  @IsNumber()
  // @IsNotEmpty()
  bedroom: number;

  @ApiProperty({ example: "1" })
  @IsNumber()
  // @IsNotEmpty()
  bathroom: number;

  @ApiProperty({ example: ["Inside Fridge", "Laundry"] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  extras?: string[];

  @ApiProperty({ example: "Basic Cleaning" })
  @IsString()
  // @IsNotEmpty()
  service: string;

  @ApiProperty({ example: "Weekly" })
  @IsString()
  // @IsNotEmpty()
  frequency: string;

  @ApiProperty({ example: "Google Search" })
  @IsString()
  // @IsNotEmpty()
  aboutUs: string;

  @ApiProperty({ example: "No special instructions" })
  @IsString()
  // @IsNotEmpty()
  specialInstructions: string;

  @ApiProperty({ example: "Key under mat" })
  @IsString()
  // @IsNotEmpty()
  homeAccess: string;

  @ApiProperty({ example: 10 })
  @IsString()
  @IsOptional()
  tips?: string;

  @ApiProperty({ example: "SHINEPOLISH2024" })
  @IsString()
  @IsOptional()
  discountCode?: string;
}
