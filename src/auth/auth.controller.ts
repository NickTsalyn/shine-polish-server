import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./dto";

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

  @Get("refresh")
  async refreshTokens() {}
}