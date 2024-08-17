import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import mongoose, { Model } from "mongoose";
import { Booking } from "./bookings.model";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.model";
import { BookingOption } from "./booking-options.model";
import { CreateBookingDto, CreateBookingOptionDto, EditBookingDto, OptionDto, UpdatePricingDto } from "./dto";
import { AppError } from "src/common/constants";
import { Pricing } from "src/common/enums";

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(BookingOption.name) private bookingOptionModel: Model<BookingOption>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
    private readonly userService: UsersService
  ) { }
  
  private static readonly BOOKING_OPTIONS_KEY = "bookingOptions";

  private async validateBooking(dto: CreateBookingDto): Promise<Booking> {
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

  async create(dto: CreateBookingDto): Promise<Booking> {
    return await this.validateBooking(dto);
  }

  async edit(id: mongoose.Types.ObjectId, dto: EditBookingDto): Promise<Booking> {
    const booking = await this.bookingModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!booking) throw new NotFoundException(AppError.BOOKING_NOT_FOUND);

    return booking;
  }

  async bookingsByUser(id: mongoose.Types.ObjectId): Promise<Booking[]> {
    return await this.bookingModel.find({ owner: id }).exec();
  }

  async getAll(): Promise<Booking[]> {
    return await this.bookingModel.find().exec();
  }

  async deleteByID(id: mongoose.Types.ObjectId): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) throw new NotFoundException(AppError.BOOKING_NOT_FOUND);

    return await this.bookingModel.findByIdAndDelete(id).exec();
  }

  async createBookingOption(dto: CreateBookingOptionDto): Promise<BookingOption> {
    const existingOptions = await this.bookingOptionModel.find().exec();
    if (existingOptions.length >= 1) throw new BadRequestException(AppError.ONE_DOCUMENT);

    await this.cacheManager.del(BookingsService.BOOKING_OPTIONS_KEY);

    return await this.bookingOptionModel.create(dto);
  }

  async getBookingOptions(): Promise<BookingOption> {
    const options = await this.cacheManager.get<BookingOption>(BookingsService.BOOKING_OPTIONS_KEY);

    if (!options) {
      const options: BookingOption = await this.bookingOptionModel.findOne().exec();

      await this.cacheManager.set(
        BookingsService.BOOKING_OPTIONS_KEY,
        options,
        this.configService.get<number>("CACHE_TTL")
      );

      return options;
    }

    return options;
  }

  async addBookingOption(optionType: string, dto: OptionDto): Promise<BookingOption> {
    const update = { $push: { [optionType]: dto } };

    const options = await this.bookingOptionModel.findOneAndUpdate({}, update, { new: true });
    if (!options) throw new NotFoundException(AppError.OPTIONS_NOT_FOUND);

    await this.cacheManager.del(BookingsService.BOOKING_OPTIONS_KEY);

    return options;
  }

  async updateBookingPricing(dto: UpdatePricingDto): Promise<BookingOption> {
    for (const key in dto) {
      if (!Object.values(Pricing).includes(key as Pricing)) throw new BadRequestException(`${key} is not a valid pricing field`);
    }

    if (dto.base < 0 || dto.coff < 0 || dto.bathPrice < 0) throw new BadRequestException(AppError.INVALID_PRICE);
    
    const options = await this.bookingOptionModel.findOneAndUpdate({}, dto, { new: true });
    if (!options) throw new NotFoundException(AppError.OPTIONS_NOT_FOUND);

    await this.cacheManager.del(BookingsService.BOOKING_OPTIONS_KEY);

    return options;
  }

  async removeBookingOption(optionType: string, name: string): Promise<BookingOption> {
    const update = { $pull: { [optionType]: { name } } };

    const options = await this.bookingOptionModel.findOneAndUpdate({}, update, { new: true });
    if (!options) throw new NotFoundException(AppError.OPTIONS_NOT_FOUND);

    await this.cacheManager.del(BookingsService.BOOKING_OPTIONS_KEY);

    return options;
  }

  async clearBookingOptions() {
    const existingOptions = await this.bookingOptionModel.find().exec();
    if (existingOptions.length < 1) throw new BadRequestException(AppError.NO_DOCUMENT);

    await this.cacheManager.del(BookingsService.BOOKING_OPTIONS_KEY);

    return await this.bookingOptionModel.deleteMany({});
  }
}
