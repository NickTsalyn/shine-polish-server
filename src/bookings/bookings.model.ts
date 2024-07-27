import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import { UserRole } from "src/common/enums";

@Schema({ _id: false })
export class Address {
  @ApiProperty({ example: "New York" })
  @Prop({ required: true })
  city: string;

  @ApiProperty({ example: "123 Main St" })
  @Prop({ required: true })
  street: string;

  @ApiProperty({ example: "Apt 1" })
  @Prop()
  aptSuite?: string;

  @ApiProperty({ example: "10001" })
  @Prop({ required: true })
  zip: string;

  @ApiProperty({ example: "NY" })
  @Prop({ required: true })
  state: string;
}

@Schema({ versionKey: false, timestamps: true })
export class Booking {
  @ApiProperty({ example: "5f9b5f5f9b5f9b5f9b5f9b5f", description: "MONGO ID" })
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @ApiProperty({ example: "alvaro_capibara@example.com" })
  @Prop()
  email: string;

  @ApiProperty({ example: "Alvaro" })
  @Prop()
  name: string;

  @ApiProperty({ example: "Capibara" })
  @Prop()
  surname: string;

  @ApiProperty({ example: "+1 234 567 890" })
  @Prop()
  phone: string;

  @ApiProperty({})
  @Prop({ type: Address })
  address: Address;

  @ApiProperty({ example: "Downtown" })
  @Prop()
  areas: string;

  @ApiProperty({ example: "2025-01-01" })
  @Prop({ type: Date })
  selectedDate: Date;

  @ApiProperty({ example: "10:00" })
  @Prop()
  time: string;

  @ApiProperty({ example: 1 })
  @Prop()
  bedroom: number;

  @ApiProperty({ example: 1 })
  @Prop()
  bathroom: number;

  @ApiProperty({ example: ["Inside Fridge", "Laundry"] })
  @Prop({ type: [String], default: [] })
  extras: string[];

  @ApiProperty({ example: "Basic Cleaning" })
  @Prop()
  services: string;

  @ApiProperty({ example: "Weekly" })
  @Prop()
  frequency: string;

  @ApiProperty({ example: "Google Search" })
  @Prop()
  aboutUs: string;

  @ApiProperty({ example: "No special instructions" })
  @Prop()
  specialInstructions: string;

  @ApiProperty({ example: "Key under mat" })
  @Prop()
  homeAccess: string;

  @ApiProperty({ example: "SUMMER2024" })
  @Prop()
  discountCode: string;

  @ApiProperty({ example: "5f9b5f5f9b5f9b5f9b5f9b5f", description: "MONGO ID" })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  owner: mongoose.Types.ObjectId;

  @ApiProperty({ example: "GUEST" })
  @Prop({ type: [String], enum: UserRole, default: [UserRole.GUEST] })
  roles: UserRole[];
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
