import { ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";

const jwtModuleOptions = (config: ConfigService): JwtModuleOptions => ({
  secret: config.get("JWT_SECRET"),
  signOptions: {
    expiresIn: config.get("JWT_EXP", "24h"),
  },
});

export const options = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => jwtModuleOptions(config),
});
