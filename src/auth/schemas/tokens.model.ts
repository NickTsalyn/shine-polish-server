import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ versionKey: false })
export class Token {
  @Prop({ unique: true })
  token: string;

  @Prop({ type: Date })
  exp: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  userId: mongoose.Types.ObjectId;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
