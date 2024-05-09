import { config } from 'dotenv';
import { registerAs } from '@nestjs/config';

config({
  path: '.env.development',
});

// export default () => {
//   return {
//     port: process.env.PORT || 4040,
//     database: {
//       host: process.env.DATABASE_HOST || 'localhost',
//       port: process.env.DATABASE_PORT || 4050,
//       user: process.env.DATABASE_USER || 'defaultUser',
//       password: process.env.DATABASE_PASSWORD || 'defaultPassword',
//     },
//   };
// };

export default registerAs<any>('app', () => {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'app',
    port: process.env.PORT || 4040,
    database: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT || 4050,
      user: process.env.DATABASE_USER || 'defaultUser',
      password: process.env.DATABASE_PASSWORD || 'defaultPassword',
    },
  };
});
