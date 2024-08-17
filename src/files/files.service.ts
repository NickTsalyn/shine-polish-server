import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { promises as fs } from "fs";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { ImagePair } from "./image-pair.model";
import { AppError } from "src/common/constants";

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(ImagePair.name)
    private readonly imagePairModel: Model<ImagePair>,
    @Inject("CLOUDINARY") private readonly cloudinary,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService
  ) { }

  private static readonly IMAGE_PAIRS_KEY = "imagePairs";
  
  async uploadFile(file: Express.Multer.File){
    const fileCloud = await this.cloudinary.uploader.upload(file.path);

    await fs.unlink(file.path);

    return fileCloud;
  }

  async deleteFile(cloudinaryID: string) {
    await this.cloudinary.uploader.destroy(cloudinaryID);
  }

  async uploadImagePair(
    beforeFile: Express.Multer.File,
    afterFile: Express.Multer.File
  ): Promise<ImagePair> {
    const beforeCloud = await this.cloudinary.uploader.upload(beforeFile.path);
    const afterCloud = await this.cloudinary.uploader.upload(afterFile.path);

    await fs.unlink(beforeFile.path);
    await fs.unlink(afterFile.path);

    const newImagePair = new this.imagePairModel({
      beforeImageID: beforeCloud.public_id,
      beforeImageURL: beforeCloud.secure_url,
      afterImageID: afterCloud.public_id,
      afterImageURL: afterCloud.secure_url,
    });

    await this.cacheManager.del(FilesService.IMAGE_PAIRS_KEY);
    
    return await newImagePair.save();
  }

  async getImagePairs(): Promise<ImagePair[]> {
    const imagePairs = await this.cacheManager.get<ImagePair[]>(FilesService.IMAGE_PAIRS_KEY);

    if (!imagePairs) { 
      const imagePairs: ImagePair[] = await this.imagePairModel.find({}).select("-beforeImageID -afterImageID").exec();
      
      if (!imagePairs) throw new NotFoundException(AppError.IMAGE_PAIR_NOT_FOUND);

      await this.cacheManager.set(FilesService.IMAGE_PAIRS_KEY, imagePairs, this.configService.get<number>("CACHE_TTL"));

      return imagePairs;
    };

    return imagePairs;
  }

  async deleteImagePair(id: mongoose.Types.ObjectId): Promise<ImagePair> {
    const imagePair = await this.imagePairModel.findById(id).exec();
    if (!imagePair) throw new NotFoundException(AppError.IMAGE_PAIR_NOT_FOUND);

    await this.cloudinary.uploader.destroy(imagePair.beforeImageID);
    await this.cloudinary.uploader.destroy(imagePair.afterImageID);

    await this.cacheManager.del(FilesService.IMAGE_PAIRS_KEY);

    return await this.imagePairModel.findByIdAndDelete(id).exec();
  }
}
