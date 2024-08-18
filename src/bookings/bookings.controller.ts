import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import mongoose from "mongoose";
import { BookingsService } from "./bookings.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ParseObjectIdPipe } from "src/common/pipes/object-ID.pipe";
import { CreateBookingDto, CreateBookingOptionDto } from "./dto";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Bookings")
@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}
  
  @Post()
  @ApiOperation({ summary: "Create booking for Guests or Users [ PUBLIC ]" })
  @ApiResponse({ status: 201, type: CreateBookingDto })
  @ApiResponse({ status: 400, description: "Bad request" })
  create(@Body() bookingDto: CreateBookingDto) {
    return this.bookingsService.create(bookingDto);
  }
  
  @Get("options")
  @ApiOperation({ summary: "Get booking options [ PUBLIC ]" })
  @ApiResponse({ status: 200, type: CreateBookingOptionDto })
  @ApiResponse({ status: 400, description: "Bad request" })
  getOptions() {
    return this.bookingsService.getBookingOptions();
  }
  
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("accessToken")
  @ApiOperation({ summary: "Get booking by ID for logged in user [ USER ]" })
  @ApiParam({ name: "id", type: String, description: "Booking ID" })
  @ApiResponse({ status: 200, type: CreateBookingDto })
  @ApiResponse({ status: 400, description: "Value is not a valid ID" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  bookingsById(@Param("id", ParseObjectIdPipe) id: mongoose.Types.ObjectId) {
    return this.bookingsService.bookingsByUser(id);
  }
}
