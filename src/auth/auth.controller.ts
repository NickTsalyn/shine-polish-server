import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SessionInfoDto, SignInDto, SignUpDto } from "./dto";
import { JwtAuthGuard } from "./auth.guard";
import { SessionInfo } from "src/decorators";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post("signin")
  async signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }

  @Get("session")
  @UseGuards(JwtAuthGuard)
  async getSessionInfo(@SessionInfo() session: SessionInfoDto) {
    return session;
  }

  @Post("signout")
  async signout() {}
}
