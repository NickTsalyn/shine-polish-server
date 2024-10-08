import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";
import { BookingOption } from "src/bookings/booking-options.model";
import { Booking } from "src/bookings/bookings.model";
import { BookingsService } from "src/bookings/bookings.service";
import { CreateBookingOptionDto, EditBookingDto, OptionDto, PromoCodeDto, UpdatePricingDto } from "src/bookings/dto";
import { FilesService } from "src/files/files.service";
import { ImagePair } from "src/files/image-pair.model";
import { CreateEmployeeDto, EditEmployeeDto } from "src/users/dto";
import { Employee } from "src/users/employees.model";
import { EmployeesService } from "src/users/employees.service";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AdminService {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly userService: UsersService,
    private readonly employeesService: EmployeesService,
    private readonly filesService: FilesService
  ) {}

  async allUsers(): Promise<User[]> {
    return await this.userService.allUsers();
  }

  async allBookings(): Promise<Booking[]> {
    return await this.bookingsService.getAll();
  }

  async editBooking(id: mongoose.Types.ObjectId, dto: EditBookingDto): Promise<Booking> {
    return await this.bookingsService.edit(id, dto);
  }

  async deleteBooking(id: mongoose.Types.ObjectId): Promise<Booking> {
    return await this.bookingsService.deleteByID(id);
  }

  async createBookingOption(dto: CreateBookingOptionDto): Promise<BookingOption> {
    return await this.bookingsService.createBookingOption(dto);
  }

  async addBookingOption(optionType: string, dto: OptionDto): Promise<BookingOption> {
    return await this.bookingsService.addBookingOption(optionType, dto);
  }

  async addPromoCode(dto: PromoCodeDto): Promise<BookingOption> {
    return await this.bookingsService.addPromoCode(dto);
  }

  async updateBookingPricing(dto: UpdatePricingDto): Promise<BookingOption> {
    return await this.bookingsService.updateBookingPricing(dto);
  }

  async removeBookingOption(optionType: string, value: string): Promise<BookingOption> {
    return await this.bookingsService.removeBookingOption(optionType, value);
  }

  async clearBookingOptions() {
    return await this.bookingsService.clearBookingOptions();
  }

  async uploadImagePair(beforeFile: Express.Multer.File, afterFile: Express.Multer.File): Promise<ImagePair> {
    return await this.filesService.uploadImagePair(beforeFile, afterFile);
  }

  async deleteImagePairByID(id: mongoose.Types.ObjectId): Promise<ImagePair> {
    return await this.filesService.deleteImagePair(id);
  }

  async addEmployee(dto: CreateEmployeeDto, avatar: Express.Multer.File): Promise<Employee> {
    return await this.employeesService.save(dto, avatar);
  }

  async getAllEmployees(): Promise<Employee[]> {
    return await this.employeesService.getAll();
  }

  async editEmployee(id: mongoose.Types.ObjectId, dto: EditEmployeeDto, avatar: Express.Multer.File): Promise<Employee> {
    return await this.employeesService.edit(id, dto, avatar);
  }

  async deleteEmployee(id: mongoose.Types.ObjectId): Promise<Employee> {
    return await this.employeesService.delete(id);
  }
}
