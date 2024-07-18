import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class BookingOption {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ default: [], required: true })
  areaOptions: { value: string; label: string }[];

  @Prop({ default: [], required: true })
  serviceOptions: { value: string; label: string }[];

  @Prop({ default: [], required: true })
  extrasOptions: { value: string; label: string }[];

  @Prop({ required: true })
  base: number;

  @Prop({ required: true })
  coff: number;

  @Prop({ required: true })
  bathPrice: number;
}

export const BookingOptionSchema = SchemaFactory.createForClass(BookingOption);