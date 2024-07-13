import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class BookingOption {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ default: [] })
  areaOptions: { value: string; label: string }[];

  @Prop({ default: [] })
  serviceOptions: { value: string; label: string }[];

  @Prop({ default: [] })
  extrasOptions: { value: string; label: string }[];
}

export const BookingOptionSchema = SchemaFactory.createForClass(BookingOption);