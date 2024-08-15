import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { AppError } from "../constants";

@Injectable()
export class EmptyBodyValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value || Object.keys(value).length === 0) {
      throw new BadRequestException(AppError.NO_DATA_TO_UPDATE);
    }
    return value;
  }
}
