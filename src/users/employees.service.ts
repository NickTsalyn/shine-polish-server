import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { promises as fs } from "fs";
import { Employee } from "./employees.model";
import { CreateEmployeeDto, EditEmployeeDto } from "./dto";
import { AppError } from "src/common/constants";
import { FilesService } from "src/files/files.service";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel("Employee") private employeeModel: Model<Employee>,
    private readonly filesService: FilesService
  ) {}

  private async findOneByEmail(email: string): Promise<Employee> {
    return await this.employeeModel.findOne({ email });
  }

  async save(
    dto: CreateEmployeeDto,
    avatar: Express.Multer.File
  ): Promise<Employee> {
    const isExistEmployee = await this.findOneByEmail(dto.email);
    if (isExistEmployee) {
      await fs.unlink(avatar.path);
      throw new ConflictException(AppError.EMPLOYEE_EXIST);
    }

    const avatarCloud = await this.filesService.uploadFile(avatar);

    const newEmployee = new this.employeeModel({
      ...dto,
      avatar: avatarCloud.secure_url,
      avatarCloudID: avatarCloud.public_id,
    });

    return await newEmployee.save();
  }

  async getAll(): Promise<Employee[]> {
    return await this.employeeModel.find().select("-avatarCloudID").exec();
  }

  async edit(
    id: mongoose.Types.ObjectId,
    dto: EditEmployeeDto,
    avatar: Express.Multer.File
  ): Promise<Employee> {
    const isExistEmployee = await this.employeeModel.findById(id);
    if (!isExistEmployee)
      throw new ConflictException(AppError.EMPLOYEE_NOT_FOUND);

    if (isExistEmployee.username === dto.username) {
      await fs.unlink(avatar.path);
      throw new ConflictException(
        "This employee is already using this username"
      );
    }
    if (isExistEmployee.email === dto.email) {
      await fs.unlink(avatar.path);
      throw new ConflictException("This employee is already using this email");
    }
    if (isExistEmployee.phone === dto.phone) {
      await fs.unlink(avatar.path);
      throw new ConflictException("This employee is already using this phone");
    }
    if (isExistEmployee.area === dto.area) {
      await fs.unlink(avatar.path);
      throw new ConflictException("This employee is already using this area");
    }

    if (avatar) {
      await this.filesService.deleteFile(isExistEmployee.avatarCloudID);
      const avatarCloud = await this.filesService.uploadFile(avatar);
      const updatedDto = {
        ...dto,
        avatar: avatarCloud.secure_url,
        avatarCloudID: avatarCloud.public_id,
      };

      return await this.employeeModel
        .findByIdAndUpdate(id, updatedDto, { new: true })
        .exec();
    }

    return await this.employeeModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  async delete(id: mongoose.Types.ObjectId): Promise<Employee> {
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) throw new ConflictException(AppError.EMPLOYEE_NOT_FOUND);

    await this.filesService.deleteFile(employee.avatarCloudID);

    return await this.employeeModel.findByIdAndDelete(employee._id).exec();
  }
}
