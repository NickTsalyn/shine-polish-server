import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateEmployeeDto {
    @ApiProperty({ example: "Alvaro Capibara" })
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    username: string;
    
    @ApiProperty({ example: "alvaro_capibara@example.com" })
    @IsString()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty({ example: "+54 9 1234 5678" })
    @IsString()
    @IsNotEmpty()
    phone: string;
    
    @ApiProperty({ example: "Downtown" })
    @IsString()
    @IsNotEmpty()
    area: string;
}