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
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/users/users.model";
import { AppError } from "src/common/constants";
import { Booking } from "src/bookings/bookings.model";

@ApiTags("Admin")
@ApiBearerAuth("accessToken")
@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("users")
  @ApiOperation({ summary: "Get all users [ ADMIN only ]" })
  @ApiResponse({ status: 200, type: [User] })
  @ApiResponse({ status: 401, description: AppError.UNAUTHORIZED })
  @ApiResponse({ status: 403, description: AppError.FORBIDDEN })
  allUsers() {
    return this.adminService.allUsers();
  }

  @Get("bookings")
  @ApiOperation({ summary: "Get all bookings [ ADMIN only ]" })
  @ApiResponse({ status: 200, type: [Booking] })
  @ApiResponse({ status: 401, description: AppError.UNAUTHORIZED })
  @ApiResponse({ status: 403, description: AppError.FORBIDDEN })
  allBookings() {
    return this.adminService.allBookings();
  }

  @Delete("bookings/:id")
  @ApiOperation({ summary: "Delete booking by ID [ ADMIN only ]" })
  @ApiResponse({ status: 200, type: Booking })
  @ApiResponse({ status: 400, description: AppError.BOOKING_NOT_FOUND })
  @ApiResponse({ status: 401, description: AppError.UNAUTHORIZED })
  @ApiResponse({ status: 403, description: AppError.FORBIDDEN })
  @ApiParam({ name: "id", type: String, description: "Booking ID"})
  deleteBooking(@Param("id", ParseObjectIdPipe) id: mongoose.Types.ObjectId) {
    return this.adminService.deleteBooking(id);
  }

  @Post("bookings/option")
  @ApiOperation({ summary: "Create booking options [ ADMIN only ]" })
  @ApiResponse({ status: 201, type: CreateBookingOptionDto })
  @ApiResponse({ status: 400, description: AppError.ONE_DOCUMENT })
  @ApiResponse({ status: 401, description: AppError.UNAUTHORIZED })
  @ApiResponse({ status: 403, description: AppError.FORBIDDEN })
  createBookingOption(@Body() dto: CreateBookingOptionDto) {
    return this.adminService.createBookingOption(dto);
  }

  @Patch("bookings/:optionType")
  @ApiOperation({ summary: "Add booking option [ ADMIN only ]" })
  @ApiResponse({ status: 201, type: OptionDto })
  @ApiResponse({ status: 400, description: "Value is not a valid option type" })
  @ApiResponse({ status: 401, description: AppError.UNAUTHORIZED })
  @ApiResponse({ status: 403, description: AppError.FORBIDDEN })
  @ApiResponse({ status: 404, description: AppError.OPTIONS_NOT_FOUND })
  addOption(
    @Param("optionType", OptionTypeValidationPipe) optionType: string,
    @Body() dto: OptionDto
  ) {
    return this.adminService.addBookingOption(optionType, dto);
  }

  @Put("bookings/pricing")
  @ApiOperation({ summary: "Update booking pricing [ ADMIN only ]" })
  @ApiResponse({ status: 200, type: UpdatePricingDto })
  @ApiResponse({ status: 400, description: "Key is not a valid pricing field" })
  @ApiResponse({ status: 401, description: AppError.UNAUTHORIZED })
  @ApiResponse({ status: 403, description: AppError.FORBIDDEN })
  updatePricing(@Body() dto: UpdatePricingDto) {
    return this.adminService.updateBookingPricing(dto);
  }

  @Delete("bookings/:optionType/:name")
  @ApiOperation({ summary: "Remove booking option [ ADMIN only ]" })
  @ApiResponse({ status: 200, type: OptionDto })
  @ApiResponse({ status: 400, description: "Value is not a valid option type" })
  @ApiResponse({ status: 401, description: AppError.UNAUTHORIZED })
  @ApiResponse({ status: 403, description: AppError.FORBIDDEN })
  @ApiResponse({ status: 404, description: "Key is not a valid option type" })
  @HttpCode(204)
  removeOption(
    @Param("optionType", OptionTypeValidationPipe) optionType: string,
    @Param("name") name: string
  ) {
    return this.adminService.removeBookingOption(optionType, name);
  }

  @Delete("bookingOptions")
  @ApiOperation({ summary: "Clear all booking options [ ADMIN only ]" })
  @ApiResponse({ status: 204, description: "Successfully operation" })
  @ApiResponse({ status: 401, description: AppError.UNAUTHORIZED })
  @ApiResponse({ status: 403, description: AppError.FORBIDDEN })
  @HttpCode(204)
  clearBookingOptions() {
    return this.adminService.clearBookingOptions();
  }
}
