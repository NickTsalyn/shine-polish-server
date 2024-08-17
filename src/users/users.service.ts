import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Model } from "mongoose";
import { Cache } from "cache-manager";
import { User } from "./users.model";
import { CreateUserDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService
  ) {}

  async save(dto: CreateUserDto): Promise<User> {
    return await this.userModel.create(dto);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.cacheManager.get<User>(email);

    if (!user) {
      const user = await this.userModel.findOne({ email });
      await this.cacheManager.set(email, user, this.configService.get<number>("CACHE_TTL"));

      return user;
    }

    return user;
  }

  async allUsers(): Promise<User[]> {
    return await this.userModel.find().select("-password").exec();
  }
}
