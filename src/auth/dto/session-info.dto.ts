import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class SessionInfoDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsArray()
  roles: string[];

  @IsNumber()
  iat: number;

  @IsNumber()
  exp: number;
}
