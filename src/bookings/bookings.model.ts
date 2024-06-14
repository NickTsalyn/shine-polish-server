import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({versionKey: false, timestamps: true})
export class Booking {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  date: string;

  @Prop()
  bedrooms: number;

  @Prop()
  bathrooms: number;

  @Prop({ required: true })
  area: string;

  @Prop()
  howOften: string;

  @Prop()
  extras: string[];

  @Prop()
  additionalInfo1: string;

  @Prop()
  additionalInfo2: string;

  @Prop()
  specialInstructions: string;

  @Prop()
  question: string;

  @Prop()
  discountCode: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  // owner: User;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
