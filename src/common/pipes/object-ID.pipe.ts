import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
  transform(value: string): mongoose.Types.ObjectId {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${value} is not a valid ID`);
    }
    return new mongoose.Types.ObjectId(value);
  }
}
