import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Booking } from "./bookings.model";
import { IBooking } from "src/helpers/interfaces";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.model";

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    private readonly userService: UsersService
  ) {}

  private async validateBooking(dto: CreateBookingDto): Promise<IBooking> {
    const isExistUser: User = await this.userService.findOneByEmail(dto.email);
    if (isExistUser) {
      const newBooking: Booking = await this.bookingModel.create(dto);
      const updatedBooking: Booking = await this.bookingModel
        .findByIdAndUpdate(
          newBooking._id,
          { owner: isExistUser._id, roles: [isExistUser.roles[0]] },
          { new: true }
        )
        .exec();

      return updatedBooking;
    }

    return await this.bookingModel.create(dto);
  }

  async createBooking(dto: CreateBookingDto): Promise<IBooking> {
    return await this.validateBooking(dto);
  }

  async getAllBooking() {
    const bookings = await this.bookingModel.find().exec(); // all bookings
    return bookings;
  }
}
