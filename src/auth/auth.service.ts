import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { SignUpDto } from "./dto";
import { AppError } from "src/helpers";
import { PasswordService } from "./password.service";
import { User } from "src/users/users.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService
  ) {}

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.username };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async signup(dto: SignUpDto) {
    const isExistUser = await this.userService.findOneByEmail(dto.email);
    if (isExistUser) throw new ConflictException(AppError.USER_EXIST);

    const hashPassword = await this.passwordService.hashPassword(dto.password);

    const newUser = await this.userService.save({
      ...dto,
      password: hashPassword,
    });
    const { token } = await this.generateToken(newUser);

    return { token, user: newUser };
  }
}
