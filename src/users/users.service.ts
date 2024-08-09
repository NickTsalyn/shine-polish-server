import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./users.model";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async save(dto: CreateUserDto): Promise<User> {
    return await this.userModel.create(dto);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }
  
  async allUsers(): Promise<User[]> {
    return await this.userModel.find().select("-password").exec();
  }

  async delete(id: string) {}
}
