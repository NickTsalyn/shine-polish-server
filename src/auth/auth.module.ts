import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { options } from "./config";
import { PasswordService } from "./password.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Token, TokenSchema } from "./schemas/tokens.model";

@Module({
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
  imports: [
    UsersModule,
    JwtModule.registerAsync(options()),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
})
export class AuthModule {}
