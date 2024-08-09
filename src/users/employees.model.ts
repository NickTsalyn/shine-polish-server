import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ versionKey: false, timestamps: true })
export class Employee {
  @ApiProperty({ example: "5f9b5f5f9b5f9b5f9b5f9b5f", description: "MONGO ID" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @ApiProperty({ example: "Alvaro Capibara" })
  @Prop({ required: true })
  username: string;

  @ApiProperty({ example: "alvaro_capibara@example.com" })
  @Prop({ unique: true, required: true })
  email: string;

  @ApiProperty({ example: "+54 9 1234 5678" })
  @Prop({ required: true })
  phone: string;

  @ApiProperty({ example: "Downtown" })
  @Prop({ required: true })
  area: string;

  @ApiProperty({ example: "https://avatar-image-url-example.com", description: "File" })
  @Prop({ required: true })
  avatar: string;

  @ApiProperty({ example: "xej5ozeizbs3owejq8wz", description: "Cloudinary ID" })
  @Prop()
  avatarCloudID: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
