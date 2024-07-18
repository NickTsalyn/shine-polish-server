import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserRole } from "src/common/enums";

@Schema({ _id: false })
export class Address {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  street: string;

  @Prop()
  aptSuite?: string;

  @Prop({ required: true })
  zip: string;

  @Prop({ required: true })
  state: string;
}

@Schema({ versionKey: false, timestamps: true })
export class Booking {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  phone: string;

  @Prop({ type: Address })
  address: Address;

  @Prop()
  areas: string;

  @Prop({ type: Date })
  selectedDate: Date;

  @Prop()
  time: string;

  @Prop()
  bedroom: number;

  @Prop()
  bathroom: number;

  @Prop({ type: [String], default: [] })
  extras: string[];

  @Prop()
  services: string;

  @Prop()
  frequency: string;

  @Prop()
  aboutUs: string;

  @Prop()
  specialInstructions: string;

  @Prop()
  homeAccess: string;

  @Prop()
  discountCode: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  owner: mongoose.Types.ObjectId;

  @Prop({ type: [String], enum: UserRole, default: [UserRole.GUEST] })
  roles: UserRole[];
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
