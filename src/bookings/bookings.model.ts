import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserRole } from "src/common/enums";

@Schema({ versionKey: false, timestamps: true })
export class Booking {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;
  
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  areas: string;

  @Prop({ required: true })
  city: string;

  @Prop()
  aptSuite: string;

  @Prop({ required: true })
  zipCode: string;

  @Prop({ type: Date, required: true })
  selectedDate: Date;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  bedroom: number;

  @Prop({ required: true })
  bathroom: number;

  @Prop({ type: [String], default: [] })
  extras: string[];

  @Prop({ required: true })
  services: string;

  @Prop({ required: true })
  frequency: string;

  @Prop({ required: true })
  aboutUs: string;

  @Prop({ required: true })
  specialInstructions: string;

  @Prop({ required: true })
  homeAccess: string;

  @Prop()
  discountCode: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  owner: mongoose.Types.ObjectId;

  @Prop({ type: [String], enum: UserRole, default: [UserRole.GUEST] })
  roles: UserRole[];
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
