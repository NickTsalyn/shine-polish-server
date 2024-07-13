import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import mongoose from "mongoose";
import { BookingsService } from "./bookings.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ParseObjectIdPipe } from "src/common/pipes/object-ID.pipe";
import { CreateBookingDto } from "./dto";

@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() bookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(bookingDto);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  bookingsById(@Param("id", ParseObjectIdPipe) id: mongoose.Types.ObjectId) {
    return this.bookingsService.bookingsByUser(id);
  }
}
