import { Injectable } from "@nestjs/common";
import { BookingOption } from "src/bookings/booking-options.model";
import { BookingsService } from "src/bookings/bookings.service";
import { CreateBookingOptionDto } from "src/bookings/dto";
import { IBooking } from "src/common/interfaces";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AdminService {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly userService: UsersService
  ) {}

  async allBookings(): Promise<IBooking[]> {
    return await this.bookingsService.getAllBookings();
  }

  async allUsers(): Promise<User[]> {
    return await this.userService.allUsers();
  }

  async createBookingOption(dto: CreateBookingOptionDto): Promise<BookingOption> {
    return await this.bookingsService.createBookingOption(dto);
  }

  async clearBookingOptions() {
    return await this.bookingsService.clearBookingOptions();
  }
}
