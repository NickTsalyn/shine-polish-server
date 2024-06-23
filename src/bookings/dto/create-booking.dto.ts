import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

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

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  areas: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsOptional()
  aptSuite?: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

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
