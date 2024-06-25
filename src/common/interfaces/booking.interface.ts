import mongoose from "mongoose";

export interface IBooking {
  _id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  surname: string;
  phone: string;
  address: string;
  areas: string;
  city: string;
  aptSuite?: string;
  zipCode: string;
  selectedDate: Date;
  time: string;
  bedroom: number;
  bathroom: number;
  extras: string[];
  services: string;
  frequency: string;
  aboutUs: string;
  specialInstructions: string;
  homeAccess: string;
  discountCode?: string;
  owner?: mongoose.Types.ObjectId;
  roles: string[];
}
