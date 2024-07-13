import { Module } from "@nestjs/common";
import { BookingsController } from "./bookings.controller";
import { BookingsService } from "./bookings.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "src/users/users.module";
import { Booking, BookingSchema } from "./bookings.model";
import { BookingOption, BookingOptionSchema } from "./booking-options.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    MongooseModule.forFeature([{ name: BookingOption.name, schema: BookingOptionSchema }]),
    UsersModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
