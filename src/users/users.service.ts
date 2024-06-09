import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./users.model";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async save(dto: CreateUserDto) {
    const newUser = await this.userModel.create(dto);

    return newUser;
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async delete(id: string) {}

  async getAll() {}
}
