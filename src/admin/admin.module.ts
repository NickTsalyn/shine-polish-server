import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { UsersModule } from "src/users/users.module";
import { BookingsModule } from "src/bookings/bookings.module";
import { FilesModule } from "src/files/files.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  imports: [
    UsersModule,
    BookingsModule,
    FilesModule,
    MulterModule.register({
      dest: "./src/files/temp",
    }),
  ],
})
export class AdminModule {}
