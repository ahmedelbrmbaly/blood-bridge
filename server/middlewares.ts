import { RequestHandler } from 'express';
import { ExpressHandler } from './types';

export const requestLoggerMiddleware: ExpressHandler<{}, {}> = (req, res, next) => {
  console.log('New Request', req.path, '-body', req.body);
  next();
};

// export const sessionMiddleware = session({
//   secret: process.env.SESSION_SECRET || 'default_secret', // Use environment variable
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }, // Set to true if using HTTPS
// });
