import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";
import { BookingOption } from "src/bookings/booking-options.model";
import { Booking } from "src/bookings/bookings.model";
import { BookingsService } from "src/bookings/bookings.service";
import { CreateBookingOptionDto, OptionDto } from "src/bookings/dto";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AdminService {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly userService: UsersService
  ) {}

  async allUsers(): Promise<User[]> {
    return await this.userService.allUsers();
  }

  async allBookings(): Promise<Booking[]> {
    return await this.bookingsService.getAllBookings();
  }

  async deleteBooking(id: mongoose.Types.ObjectId): Promise<Booking> {
    return await this.bookingsService.deleteBookingByID(id);
  }

  async createBookingOption(dto: CreateBookingOptionDto): Promise<BookingOption> {
    return await this.bookingsService.createBookingOption(dto);
  }

  async getOptions(): Promise<BookingOption> {
    return await this.bookingsService.getBookingOptions();
  }

  async addBookingOption(optionType: string, dto: OptionDto) {
    return await this.bookingsService.addBookingOption(optionType, dto);
  }

  async removeBookingOption(optionType: string, value: string) {
    return await this.bookingsService.removeBookingOption(optionType, value);
  }

  async clearBookingOptions() {
    return await this.bookingsService.clearBookingOptions();
  }
}
