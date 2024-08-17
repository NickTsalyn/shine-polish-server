import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { CacheModule } from "@nestjs/cache-manager";
import * as cloudinary from "cloudinary";
import { FilesService } from "./files.service";
import { ImagePair, ImagePairSchema } from "./image-pair.model";
import { cloudinaryConfig } from "src/config";
import { FilesController } from './files.controller';
import { MulterModule } from "@nestjs/platform-express";

@Module({
  providers: [
    FilesService,
    {
      provide: "CLOUDINARY",
      useFactory: (config: ConfigService) => {
        cloudinaryConfig(config);
        return cloudinary;
      },
      inject: [ConfigService],
    },
  ],
  imports: [
    MongooseModule.forFeature([
      { name: ImagePair.name, schema: ImagePairSchema },
    ]),
    MulterModule.register({
      dest: "./src/files/temp",
    }),
    CacheModule.register(),
    ConfigModule,
  ],
  exports: [FilesService, "CLOUDINARY"],
  controllers: [FilesController],
})
export class FilesModule {}
