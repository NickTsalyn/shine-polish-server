import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { EmployeesService } from "./employees.service";
import { User, UserSchema } from "./users.model";
import { Employee, EmployeeSchema } from "./employees.model";
import { FilesModule } from "src/files/files.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
    FilesModule
  ],
  providers: [UsersService, EmployeesService],
  exports: [UsersService, EmployeesService],
})
export class UsersModule {}
