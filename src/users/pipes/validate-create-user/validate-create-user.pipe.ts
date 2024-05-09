import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('inside ValidateCreateUserPipe');

    const parseAgeToInt = /^\d+$/.test(value.age.toString())
      ? parseInt(value.age.toString())
      : null;

    if (isNaN(parseAgeToInt) || !parseAgeToInt) {
      throw new HttpException(
        'Invalid data. Age must be a number !!!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { ...value, age: parseAgeToInt };
  }
}
