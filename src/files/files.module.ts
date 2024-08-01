import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import * as cloudinary from "cloudinary";
import { FilesService } from "./files.service";
import { ImagePair, ImagePairSchema } from "./image-pair.model";
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
})
export class FilesModule {}
