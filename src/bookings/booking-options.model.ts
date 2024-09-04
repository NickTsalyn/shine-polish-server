import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ versionKey: false, timestamps: true })
export class BookingOption {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ default: [], required: true })
  areaOptions: { name: string; value: number }[];

  @Prop({ default: [], required: true })
  serviceOptions: { name: string; value: number }[];

  @Prop({ default: [], required: true })
  extrasOptions: { name: string; value: number }[];

  @Prop({ default: [], required: true })
  discountOptions: { name: string; value: number }[];

  @Prop({ required: true })
  base: number;

  @Prop({ required: true })
  coff: number;

  @Prop({ required: true })
  bathPrice: number;

  @Prop({ default: [], required: true })
  promoCodes: { name: string; discount: number }[];
}

export const BookingOptionSchema = SchemaFactory.createForClass(BookingOption);