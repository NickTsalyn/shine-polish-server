import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Response } from "express";
import { ITokens } from "src/helpers/interfaces";

@Injectable()
export class CookieService {
  private static readonly REFRESH_TOKEN = "refreshToken";

  async setRefreshToken(tokens: ITokens, res: Response): Promise<void> {
    if (!tokens) throw new UnauthorizedException();

    res.cookie(CookieService.REFRESH_TOKEN, tokens.refreshToken.token, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(tokens.refreshToken.exp),
      secure: true,
      path: "/",
    });
  }

  async deleteRefreshToken(res: Response): Promise<void> {
    res.clearCookie(CookieService.REFRESH_TOKEN);
  }
}
