import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class EditBookingAddressDto {
  @ApiProperty({ example: "New York" })
  @IsString()
  @IsOptional()
  city?: string = "";

  @ApiProperty({ example: "123 Main St" })
  @IsString()
  @IsOptional()
  street?: string = "";

  @ApiProperty({ example: "Apt 13" })
  @IsString()
  @IsOptional()
  aptSuite?: string = "";

  @ApiProperty({ example: "10001" })
  @IsString()
  @IsOptional()
  zip?: string = "";

  @ApiProperty({ example: "NY" })
  @IsString()
  @IsOptional()
  state?: string = "";
}
export class EditBookingDto {
  @ApiProperty({ example: "alvaro_capibara@example.com" })
  @IsString()
  @IsOptional()
  email?: string = "";

  @ApiProperty({ example: "Alvaro" })
  @IsString()
  @IsOptional()
  name?: string = "";

  @ApiProperty({ example: "Capibara" })
  @IsString()
  @IsOptional()
  surname?: string = "";

  @ApiProperty({ example: "+1 234 567 890" })
  @IsString()
  @IsOptional()
  phone?: string = "";

  @ApiProperty({ type: EditBookingAddressDto })
  @ValidateNested()
  @IsOptional()
  @Type(() => EditBookingAddressDto)
  address?: EditBookingAddressDto = new EditBookingAddressDto();

  @ApiProperty({ example: "Downtown" })
  @IsString()
  @IsOptional()
  area?: string = "";

  @ApiProperty({ example: "2022-01-01" })
  @IsString()
  @IsOptional()
  selectedDate?: string = "";

  @ApiProperty({ example: "16:00" })
  @IsString()
  @IsOptional()
  time?: string = "";
  
  @ApiProperty({ example: "2" })
  @IsNumber()
  @IsOptional()
  bedroom?: number = 1;
  
  @ApiProperty({ example: "1" })
  @IsNumber()
  @IsOptional()
  bathroom?: number = 1;

  @ApiProperty({ example: ["Inside Fridge", "Laundry"] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  extras?: string[] = [];

  @ApiProperty({ example: "Basic Cleaning" })
  @IsString()
  @IsOptional()
  service?: string = "";

  @ApiProperty({ example: "Weekly" })
  @IsString()
  @IsOptional()
  frequency?: string = "";

  @ApiProperty({ example: "Google Search" })
  @IsString()
  @IsOptional()
  aboutUs?: string = "";

  @ApiProperty({ example: "No special instructions" })
  @IsString()
  @IsOptional()
  specialInstructions?: string = "";

  @ApiProperty({ example: "Key under mat" })
  @IsString()
  @IsOptional()
  homeAccess?: string = "";

  @ApiProperty({ example: 10 })
  @IsString()
  @IsOptional()
  tips?: string = "";

  @ApiProperty({ example: 333 })
  @IsNumber()
  @IsOptional()
  totalPrice?: number = 0;
}
