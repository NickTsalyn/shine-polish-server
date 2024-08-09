import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { CreateEmployeeDto } from "./dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("employees")
export class UsersController {
  constructor(private readonly employeesService: EmployeesService) {}


}
