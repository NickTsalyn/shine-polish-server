import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserRole } from "src/common/enums";

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

  @Prop({ required: true })
  address: string;

  @Prop()
  areas: string;

  @Prop()
  city: string;

  @Prop()
  aptSuite: string;

  @Prop()
  zipCode: string;

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
