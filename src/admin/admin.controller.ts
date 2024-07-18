import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import mongoose from "mongoose";
import { AdminService } from "./admin.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/common/decorators";
import { UserRole } from "src/common/enums";
import {
  CreateBookingOptionDto,
  OptionDto,
  UpdatePricingDto,
} from "src/bookings/dto";
import { OptionTypeValidationPipe, ParseObjectIdPipe } from "src/common/pipes";

@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("users")
  allUsers() {
    return this.adminService.allUsers();
  }

  @Get("bookings")
  allBookings() {
    return this.adminService.allBookings();
  }

  @Delete("bookings/:id")
  deleteBooking(@Param("id", ParseObjectIdPipe) id: mongoose.Types.ObjectId) {
    return this.adminService.deleteBooking(id);
  }

  @Post("bookings/option")
  createBookingOption(@Body() dto: CreateBookingOptionDto) {
    return this.adminService.createBookingOption(dto);
  }

  @Get("bookings/option")
  getOptions() {
    return this.adminService.getOptions();
  }

  @Patch("bookings/:optionType")
  addOption(
    @Param("optionType", OptionTypeValidationPipe) optionType: string,
    @Body() dto: OptionDto
  ) {
    return this.adminService.addBookingOption(optionType, dto);
  }

  @Put("bookings/pricing")
  updatePricing(@Body() dto: UpdatePricingDto) {
    return this.adminService.updateBookingPricing(dto);
  }

  @Delete("bookings/:optionType/:value")
  @HttpCode(204)
  removeOption(
    @Param("optionType", OptionTypeValidationPipe) optionType: string,
    @Param("value") value: string
  ) {
    return this.adminService.removeBookingOption(optionType, value);
  }

  @Delete("bookingOptions")
  @HttpCode(204)
  clearBookingOptions() {
    return this.adminService.clearBookingOptions();
  }
}
