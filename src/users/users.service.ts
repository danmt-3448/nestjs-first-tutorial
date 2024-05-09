import { Injectable } from '@nestjs/common';
import { CreateTypeUser, GetListUserType } from 'src/utils/types';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { username: 'danmt1', email: 'danmt1@gmail.com' },
    { username: 'danmt2', email: 'danmt2@gmail.com' },
    { username: 'danmt3', email: 'danmt3@gmail.com' },
  ];

  fetchUser(queryOptions: GetListUserType) {
    console.log(queryOptions);
    return this.fakeUsers;
  }

  createUser(userData: CreateTypeUser) {
    this.fakeUsers.push(userData);
    return { msg: 'oke la' };
  }

  fetchUserById(id: number) {
    return { id, username: 'danmt3', email: 'danmt3@gmail.com' };
  }
}
