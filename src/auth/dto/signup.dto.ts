import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { AppValidation } from "src/common/constants";
import { UserRole } from "src/common/enums";

export class SignUpDto {
  @ApiProperty({ example: "Alvaro Capibara" })
  @IsString()
  @MinLength(3)
  username: string;
  
  @ApiProperty({ example: "alvaro_capibara@example.com" })
  @IsEmail({}, { message: AppValidation.IS_EMAIL })
  @IsNotEmpty()
  email: string;
  
  @ApiProperty({ example: "qwerty12345" })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
export class SignUpResponce {
  @ApiProperty({ example: "Alvaro Capibara" })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ example: "alvaro_capibara@example.com" })
  @IsEmail({}, { message: AppValidation.IS_EMAIL })
  @IsNotEmpty()
  email: string;
  
  @ApiProperty({ example: "qwerty12345" })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: ["USER"] })
  @IsNotEmpty()
  roles: UserRole[];
}

export class SignUpResponceDto {
  @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IeyJpZCI6IjY2YT" })
  accessToken: string;

  @ApiProperty({ type: SignUpResponce, description: "User details" })
  user: SignUpResponce;
}
