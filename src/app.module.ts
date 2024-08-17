import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { BookingsModule } from "./bookings/bookings.module";
import { AdminModule } from "./admin/admin.module";
import { FilesModule } from "./files/files.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>("MONGO_DB"),
      }),
    }),
    UsersModule,
    AuthModule,
    BookingsModule,
    AdminModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
