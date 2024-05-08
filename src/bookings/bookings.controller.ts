import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
    constructor(private bookingsService: BookingsService) {}

    @Post()
    create(@Body() bookingDto: CreateBookingDto) {
        return this.bookingsService.createBooking(bookingDto);
    }

    @Get()
    allBookings() {
        return this.bookingsService.getAllBooking();
    }
}
