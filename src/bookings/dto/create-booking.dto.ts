import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  bedrooms: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  bathrooms: number;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsString()
  @IsOptional()
  howOften?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  extras?: string[];

  @IsString()
  @IsOptional()
  additionalInfo1?: string;

  @IsString()
  @IsOptional()
  additionalInfo2?: string;

  @IsString()
  @IsOptional()
  specialInstructions?: string;

  @IsString()
  @IsOptional()
  question?: string;

  @IsString()
  @IsOptional()
  discountCode?: string;

  // @IsString()
  // @IsNotEmpty()
  // owner: string;
}
