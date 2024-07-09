import { Body, Controller, Delete, Get, HttpCode, Post, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/common/decorators";
import { UserRole } from "src/common/enums";
import { CreateBookingOptionDto } from "src/bookings/dto";

@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("bookings")
  allBookings() {
    return this.adminService.allBookings();
  }

  @Get("users")
  allUsers() {
    return this.adminService.allUsers();
  }

  @Post("bookings/option")
  createBookingOption(@Body() dto: CreateBookingOptionDto) {
    return this.adminService.createBookingOption(dto);
  }

  @Delete("bookings/option")
  @HttpCode(204)
  clearBookingOptions() {
    return this.adminService.clearBookingOptions();
  }
}
