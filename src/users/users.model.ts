import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import { UserRole } from "src/common/enums";

@Schema({ versionKey: false, timestamps: true })
export class User {
  @ApiProperty({ example: "5f9b5f5f9b5f9b5f9b5f9b5f", description: "MONGO ID" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @ApiProperty({ example: "Alvaro Capibara" })
  @Prop()
  username: string;

  @ApiProperty({ example: "alvaro_capibara@example.com" })
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: ["USER"] })
  @Prop({ type: [String], enum: UserRole, default: [UserRole.USER] })
  roles: UserRole[];
}

export const UserSchema = SchemaFactory.createForClass(User);
