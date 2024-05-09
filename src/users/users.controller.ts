import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto, GetListUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/users.service';
import { SortBy } from 'src/utils/enum';

@Controller('users')
// guard check all method in controller
// @UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  // guard is put it here will only check this method
  @UseGuards(AuthGuard)
  getUsers(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('sortBy') sortBy?: SortBy | undefined,
  ) {
    if (sortBy && !Object.values(SortBy).includes(sortBy)) {
      throw new HttpException('Invalid sortBy value', HttpStatus.BAD_REQUEST);
    }
    const queryOptions: GetListUserDto = {
      sortBy: sortBy || SortBy.ASC,
      page,
      limit,
    };

    return this.usersService.fetchUser(queryOptions);
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }

  @Get(':id')
  // guard is put it here will only check this method
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.fetchUserById(id);
    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
