import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ".env"}),
    MongooseModule.forRoot(process.env.MONGO_DB),
    BookingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
