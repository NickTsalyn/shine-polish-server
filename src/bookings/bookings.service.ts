import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './bookings.model';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
    constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) {}

    async createBooking(dto: CreateBookingDto) {
        const newBooking = await this.bookingModel.create(dto);
        return newBooking;
    }

    async getAllBooking() {
        const bookings = await this.bookingModel.find().exec(); // all bookings
        return bookings;
    }
}
