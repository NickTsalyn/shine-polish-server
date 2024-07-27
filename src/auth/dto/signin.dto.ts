import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserRole } from "src/common/enums";

export class SignInDto {
  @ApiProperty({ example: "alvaro_capibara@example.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty({ example: "qwerty12345" })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class SignInResponce {
  @ApiProperty({ example: "Alvaro Capibara" })
  @IsString()
  @MinLength(3)
  username: string;
  
  @ApiProperty({ example: "alvaro_capibara@example.com" })
  @IsEmail()
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

export class SignInResponceDto {
  @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IeyJpZCI6IjY2YT" })
  accessToken: string;

  @ApiProperty({ type: SignInResponce, description: "User details" })
  user: SignInResponce;
}