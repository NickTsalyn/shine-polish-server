import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";
import { UserRole } from "src/common/enums";

export class SessionInfoDto {
  @ApiProperty({ example: "1234567890" })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: "alvaro_capibara@example.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "Alvaro Capibara" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: ["USER"] })
  @IsArray()
  roles: UserRole[];

  @ApiProperty({ example: 1234567890 })
  @IsNumber()
  iat: number;

  @ApiProperty({ example: 1234567890 })
  @IsNumber()
  exp: number;
}

export class SessionInfoResponceDto {
  @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IeyJpZCI6IjY2YT" })
  accessToken: string;

  @ApiProperty({ type: SessionInfoDto, description: "Session details" })
  session: SessionInfoDto;
}