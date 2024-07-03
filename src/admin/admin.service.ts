import { Injectable } from "@nestjs/common";
import { BookingsService } from "src/bookings/bookings.service";
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
}
