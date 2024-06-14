import { BadRequestException, Body, Controller, Get, Post, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { SessionInfoDto, SignInDto, SignUpDto } from "./dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./auth.guard";
import { TokensService } from "./tokens.service";
import { Cookie, SessionInfo } from "src/decorators";
import { CookieService } from "./cookie.service";
import { Response } from "express";
import { AppError } from "src/helpers";
import { IUser } from "src/helpers/interfaces";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly tokensService: TokensService
  ) {}

  static REFRESH_TOKEN = "refreshToken";

  @Post("signup")
  async signup(
    @Body() dto: SignUpDto
  ): Promise<{ accessToken: string; user: IUser}> {
    const { accessToken, user } = await this.authService.signup(dto);
    if (!accessToken || !user) throw new BadRequestException(AppError.FAILED_SIGNUP);

    return { accessToken, user };
  }

  @Post("signin")
  async signin(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ accessToken: string; user: IUser}> {
    const { accessToken, refreshToken, user } = await this.authService.signin(dto);
    if (!accessToken || !refreshToken || !user) throw new BadRequestException(AppError.FAILED_SIGNIN);

    await this.cookieService.setRefreshToken({ accessToken, refreshToken }, res);

    return { accessToken, user };
  }

  @Get("refresh-session")
  @UseGuards(JwtAuthGuard)
  async getSessionInfo(
    @SessionInfo() session: SessionInfoDto,
    @Cookie(AuthController.REFRESH_TOKEN) refreshToken: string, 
    @Res({ passthrough: true }) res: Response
  ): Promise<{ accessToken: string; session: SessionInfoDto}> {
    if (!refreshToken) throw new UnauthorizedException(AppError.UNAUTHORIZED);

    const tokens = await this.tokensService.refreshTokens(refreshToken);
    if (!tokens) throw new UnauthorizedException(AppError.FAILED_REFRESH);

    await this.cookieService.setRefreshToken(tokens, res);

    return {accessToken: tokens.accessToken, session};
  }

  @Post("signout")
  async signout() {}
}
