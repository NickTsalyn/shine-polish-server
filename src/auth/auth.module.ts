import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { options } from "./config";
import { PasswordService } from "./password.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Token, TokenSchema } from "./schemas/tokens.model";
import { TokensService } from "./tokens.service";
import { CookieService } from "./cookie.service";
import { User, UserSchema } from "src/users/users.model";

@Module({
  controllers: [AuthController],
  providers: [AuthService, PasswordService, TokensService, CookieService],
  imports: [
    UsersModule,
    JwtModule.registerAsync(options()),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
