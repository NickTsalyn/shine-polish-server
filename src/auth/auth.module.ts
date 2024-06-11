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

@Module({
  controllers: [AuthController],
  providers: [AuthService, PasswordService, TokensService],
  imports: [
    UsersModule,
    JwtModule.registerAsync(options()),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  exports: [
    JwtModule
  ]
})
export class AuthModule {}
