import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class EditEmployeeDto {
  @ApiProperty({ example: "Alvaro Capibara" })
  @IsString()
  @IsOptional()
  username?: string = "";

  @ApiProperty({ example: "alvaro_capibara@example.com" })
  @IsString()
  @IsOptional()
  email?: string = "";

  @ApiProperty({ example: "+54 9 1234 5678" })
  @IsString()
  @IsOptional()
  phone?: string = "";

  @ApiProperty({ example: "Downtown" })
  @IsString()
  @IsOptional()
  area?: string = "";
}

export const editEmployeeApiBodySchema = {
  schema: {
    type: "object",
    properties: {
      avatar: {
        type: "string",
        format: "binary",
      },
      username: {
        type: "string",
        example: "Alvaro Capibara",
      },
      email: {
        type: "string",
        example: "alvaro_capibara@example.com",
      },
      phone: {
        type: "string",
        example: "+54 9 1234 5678",
      },
      area: {
        type: "string",
        example: "Downtown",
      },
    },
  },
};
