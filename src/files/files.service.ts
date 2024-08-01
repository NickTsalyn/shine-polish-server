import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { promises as fs } from "fs";
import { ImagePair } from "./image-pair.model";
import { AppError } from "src/common/constants";

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(ImagePair.name)
    private readonly imagePairModel: Model<ImagePair>,
    @Inject("CLOUDINARY") private readonly cloudinary
  ) {}

  async uploadImage(
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

    return await newImagePair.save();
  }

  async getImagePairs(): Promise<ImagePair[]> {
    const imagePairs: ImagePair[] = await this.imagePairModel.find({});
    if (!imagePairs) throw new NotFoundException(AppError.IMAGE_PAIR_NOT_FOUND);

    return imagePairs;
  }

  async deleteImagePair(id: mongoose.Types.ObjectId): Promise<ImagePair> {
    const imagePair = await this.imagePairModel.findById(id).exec();
    if (!imagePair) throw new NotFoundException(AppError.IMAGE_PAIR_NOT_FOUND);

    await this.cloudinary.uploader.destroy(imagePair.beforeImageID);
    await this.cloudinary.uploader.destroy(imagePair.afterImageID);

    return await this.imagePairModel.findByIdAndDelete(id).exec();
  }
}
