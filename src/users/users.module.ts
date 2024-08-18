import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { EmployeesService } from "./employees.service";
import { User, UserSchema } from "./users.model";
import { Employee, EmployeeSchema } from "./employees.model";
import { FilesModule } from "src/files/files.module";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
    CacheModule.register(),
    FilesModule
  ],
  providers: [UsersService, EmployeesService],
  exports: [UsersService, EmployeesService],
})
export class UsersModule {}
