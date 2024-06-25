import { BadRequestException, Body, Controller, Get, HttpCode, Post, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { SessionInfoDto, SignInDto, SignUpDto } from "./dto";
import { AuthService } from "./auth.service";
import { TokensService } from "./tokens.service";
import { Cookie, SessionInfo, UserAgent } from "src/common/decorators";
import { CookieService } from "./cookie.service";
import { Response } from "express";
import { AppError } from "src/common/constants";
import { IUser } from "src/common/interfaces";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly tokensService: TokensService
  ) {}

  private static readonly REFRESH_TOKEN = "refreshToken";

  @Post("signup")
  async signup(
    @Body() dto: SignUpDto,
    @UserAgent() agent: string,
  ): Promise<{ accessToken: string; user: IUser}> {
    const { accessToken, user } = await this.authService.signup(dto, agent);
    if (!accessToken || !user) throw new BadRequestException(AppError.FAILED_SIGNUP);

    return { accessToken, user };
  }

  @Post("signin")
  async signin(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response,
    @UserAgent() agent: string,
  ): Promise<{ accessToken: string; user: IUser}> {  
    const { accessToken, refreshToken, user } = await this.authService.signin(dto, agent);

    if (!accessToken || !refreshToken || !user) throw new BadRequestException(AppError.FAILED_SIGNIN);

    await this.cookieService.setRefreshToken({ accessToken, refreshToken }, res);

    return { accessToken, user };
  }

  @Get("refresh-session")
  @UseGuards(JwtAuthGuard)
  async getSessionInfo(
    @SessionInfo() session: SessionInfoDto,
    @Cookie(AuthController.REFRESH_TOKEN) refreshToken: string, 
    @Res({ passthrough: true }) res: Response,
    @UserAgent() agent: string,
  ): Promise<{ accessToken: string; session: SessionInfoDto}> {
    if (!refreshToken) throw new UnauthorizedException(AppError.UNAUTHORIZED);
    
    const tokens = await this.tokensService.refreshTokens(refreshToken, agent);
    if (!tokens) throw new UnauthorizedException(AppError.FAILED_REFRESH);
    
    await this.cookieService.setRefreshToken(tokens, res);

    return {accessToken: tokens.accessToken, session};
  }

  @Post("signout")
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async signout(
    @Cookie(AuthController.REFRESH_TOKEN) refreshToken: string, 
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.tokensService.deleteRefreshToken(refreshToken);
    await this.cookieService.deleteRefreshToken(res);

    return;
  }
}
