import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { SignInDto, SignUpDto } from "./dto";
import { AppError } from "src/helpers";
import { PasswordService } from "./password.service";
import { User } from "src/users/users.model";
import { Tokens } from "src/interfaces";
import { InjectModel } from "@nestjs/mongoose";
import { Token } from "./schemas/tokens.model";
import mongoose, { Model } from "mongoose";
import { v4 } from "uuid";
import { add } from "date-fns";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    @InjectModel(Token.name) private tokenRepository: Model<Token>
  ) {}

  private async validateUser(dto: SignInDto) {
    const user: User = await this.userService.findOneByEmail(dto.email);
    if (!user) throw new UnauthorizedException({ message: AppError.WRONG_DATA });

    const passwordEquals = await this.passwordService.comparePassword(
      dto.password,
      user.password
    );
    if (user && passwordEquals) return user;

    throw new UnauthorizedException({ message: AppError.WRONG_DATA });
  }

  private async generateAccessToken(user: User) {
    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
      roles: user.roles,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async generateRefreshToken(
    userId: mongoose.Types.ObjectId
  ): Promise<Token> {
    return this.tokenRepository.create({
      token: v4(),
      exp: add(new Date(), { months: 1 }),
      userId,
    });
  }

  async signup(dto: SignUpDto) {
    const isExistUser: User = await this.userService.findOneByEmail(dto.email);
    if (isExistUser) throw new ConflictException(AppError.USER_EXIST);

    const hashPassword = await this.passwordService.hashPassword(dto.password);
    const newUser: User = await this.userService.save({
      ...dto,
      password: hashPassword,
    });
    const { accessToken } = await this.generateAccessToken(newUser);

    return {
      token: accessToken,
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        roles: newUser.roles,
      },
    };
  }

  async signin(dto: SignInDto) {
    const user: User = await this.validateUser(dto);
    const { accessToken } = await this.generateAccessToken(user);
    // const refreshToken: Token = await this.generateRefreshToken(user._id);

    return {
      token: accessToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        roles: user.roles,
      },
    };
  }
}
