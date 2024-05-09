import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { SortBy } from 'src/utils/enum';

export class GetListUserDto {
  @IsOptional()
  sortBy: SortBy;

  @IsNotEmpty()
  @IsNumber()
  page: number;

  @IsNotEmpty()
  @IsNumber()
  limit: number;
}

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @IsNumber({}, { message: 'age must be a number !!!' })
  age: number;
}
