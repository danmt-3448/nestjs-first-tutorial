import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersMiddleware } from 'src/users/middlewares/users/users.middleware';
import { AnotherMiddleware } from 'src/users/middlewares/another/another.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersMiddleware)
      .forRoutes(
        // Requires all route users to have middleware running
        // 'users'
        // ---------
        // define some routes were required run middleware
        { path: 'users', method: RequestMethod.GET },
        { path: 'users/:id', method: RequestMethod.GET },
      )
      // add more middle ware for all routes users with any method
      .apply(AnotherMiddleware)
      .forRoutes('users');
  }
}
