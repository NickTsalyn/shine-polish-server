import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { AppValidation } from "src/common/constants";

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  username: string;
  
  @IsEmail({}, { message: AppValidation.IS_EMAIL })
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
