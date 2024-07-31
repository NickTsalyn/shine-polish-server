import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { UsersModule } from "src/users/users.module";
import { BookingsModule } from "src/bookings/bookings.module";

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  imports: [UsersModule, BookingsModule],
})
export class AdminModule {}
