import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { v4 } from "uuid";
import { add } from "date-fns";
import { User } from "src/users/users.model";
import { Token } from "./schemas/tokens.model";
import { ITokens } from "src/common/interfaces";
import { AppError } from "src/common/constants";

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userRepository: Model<User>,
    @InjectModel(Token.name) private tokenRepository: Model<Token>
  ) {}

  private async generateAccessToken(user: User): Promise<string> {
    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
      roles: user.roles,
    };

    return this.jwtService.sign(payload);
  }

  private async generateRefreshToken(
    userId: mongoose.Types.ObjectId,
    agent: string
  ): Promise<Token> {
    const token = await this.tokenRepository.findOne({
      userId,
      userAgent: agent,
    });

    if (!token) {
      return this.tokenRepository.create({
        token: v4(),
        exp: add(new Date(), { months: 1 }),
        userId,
        userAgent: agent,
      });
    }

    return this.tokenRepository.findOneAndUpdate(
      { token: token.token },
      {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
      },
      { new: true }
    );
  }
  async generateTokens(user: User, agent: string): Promise<ITokens> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user._id, agent);

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string, agent: string): Promise<ITokens> {
    const token = await this.tokenRepository.findOne({ token: refreshToken });
    if (!token) throw new UnauthorizedException();

    if (new Date(token.exp) < new Date()) {
      await this.tokenRepository.deleteOne({ _id: token._id });
      throw new UnauthorizedException(AppError.SESSION_EXPIRED);
    }

    await this.tokenRepository.findByIdAndUpdate(
      { _id: token._id },
      {
        token: v4(),
        exp: add(new Date(), { months: 1 }),
      },
      { new: true }
    );

    const user: User = await this.userRepository.findById({
      _id: token.userId,
    });
    if (!user) throw new BadRequestException(AppError.USER_NOT_FOUND);

    return this.generateTokens(user, agent);
  }

  async deleteRefreshToken(token: string) {
    return await this.tokenRepository.findOneAndDelete({ token });
  }
}
