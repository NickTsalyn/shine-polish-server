import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Token } from "./schemas/tokens.model";
import mongoose, { Model } from "mongoose";
import { v4 } from "uuid";
import { add } from "date-fns";
import { User } from "src/users/users.model";
import { Tokens } from "src/helpers/interfaces";

@Injectable()
export class TokensService {
  constructor(
    private readonly jwtService: JwtService,
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
    userId: mongoose.Types.ObjectId
  ): Promise<Token> {
    return this.tokenRepository.create({
      token: v4(),
      exp: add(new Date(), { months: 1 }),
      userId,
    });
  }

  async generateTokens(user: User): Promise<Tokens> {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user._id);

    return { accessToken, refreshToken };
  }
}
