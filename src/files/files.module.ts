import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ImagePair, ImagePairSchema } from "./image-pair.model";
import * as cloudinary from "cloudinary";
import { cloudinaryConfig } from "src/config";

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
    ConfigModule,
  ],
  exports: [FilesService, "CLOUDINARY"],
  controllers: [FilesController],
})
export class FilesModule {}
