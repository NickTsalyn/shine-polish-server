import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/common/decorators";
import { UserRole } from "src/common/enums";

@Controller("bookings")
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  create(@Body() bookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(bookingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  allBookings() {
    return this.bookingsService.getAllBooking();
  }
}
