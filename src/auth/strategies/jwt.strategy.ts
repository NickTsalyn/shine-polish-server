import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IJwtPayload } from "src/helpers/interfaces";
import { UsersService } from "src/users/users.service";
import { AppError } from "src/helpers";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.userService.findOneByEmail(payload.email);
    if (!user) throw new UnauthorizedException(AppError.UNAUTHORIZED);

    return payload;
  }
}
