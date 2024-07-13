import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Booking } from "./bookings.model";
import { IBooking } from "src/common/interfaces";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.model";
import { BookingOption } from "./booking-options.model";
import { CreateBookingDto, CreateBookingOptionDto, OptionDto } from "./dto";
import { AppError } from "src/common/constants";

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(BookingOption.name) private bookingOptionModel: Model<BookingOption>,
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

  async bookingsByUser(id: mongoose.Types.ObjectId): Promise<IBooking[]> {
    return await this.bookingModel.find({ owner: id }).exec();
  }

  async getAllBookings(): Promise<IBooking[]> {
    return await this.bookingModel.find().exec();
  }

  async deleteBookingByID(id: mongoose.Types.ObjectId): Promise<IBooking> {
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) throw new BadRequestException(AppError.BOOKING_NOT_FOUND);

    return await this.bookingModel.findByIdAndDelete(id).exec();
  }

  async createBookingOption(dto: CreateBookingOptionDto): Promise<BookingOption> {
    const existingOptions = await this.bookingOptionModel.find().exec();
    if (existingOptions.length >= 1) throw new BadRequestException(AppError.ONE_DOCUMENT);

    return await this.bookingOptionModel.create(dto);
  }

  async getBookingOptions(): Promise<BookingOption> {
    return await this.bookingOptionModel.findOne().exec();
  }

  async addBookingOption(optionType: string, dto: OptionDto): Promise<BookingOption> {
    const update = { $push: { [optionType]: dto } };

    const options = await this.bookingOptionModel.findOneAndUpdate({}, update, { new: true });
    if (!options) throw new NotFoundException(AppError.OPTIONS_NOT_FOUND);

    return options;
  }

  async removeBookingOption(optionType: string, value: string): Promise<BookingOption> {
    const update = { $pull: { [optionType]: { value } } };

    const options = await this.bookingOptionModel.findOneAndUpdate({}, update, { new: true });
    if (!options) throw new NotFoundException(AppError.OPTIONS_NOT_FOUND);

    return options;
  }

  async clearBookingOptions() {
    const existingOptions = await this.bookingOptionModel.find().exec();
    if (existingOptions.length < 1) throw new BadRequestException(AppError.NO_DOCUMENT);

    return await this.bookingOptionModel.deleteMany({});
  }
}
