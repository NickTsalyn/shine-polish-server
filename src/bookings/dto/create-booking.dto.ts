import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { BookingAddressDto } from "./booking-address.dto";

export class CreateBookingDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @ValidateNested()
  @Type(() => BookingAddressDto)
  address: BookingAddressDto;

  @IsString()
  @IsNotEmpty()
  areas: string;

  @IsDateString()
  @IsNotEmpty()
  selectedDate: Date;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsNumber()
  @IsNotEmpty()
  bedroom: number;

  @IsNumber()
  @IsNotEmpty()
  bathroom: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  extras?: string[];

  @IsString()
  @IsNotEmpty()
  services: string;

  @IsString()
  @IsNotEmpty()
  frequency: string;

  @IsString()
  @IsNotEmpty()
  aboutUs: string;

  @IsString()
  @IsNotEmpty()
  specialInstructions: string;

  @IsString()
  @IsNotEmpty()
  homeAccess: string;

  @IsString()
  @IsOptional()
  discountCode?: string;
}
