import { RequestHandler } from 'express';
import { BaseUser, ExpressHandler } from './types';
import { setLogedUser, getLogedUser } from './index';

export const requestLoggerMiddleware: ExpressHandler<{}, {}> = (req, res, next) => {
  console.log('New Request', req.path, '-body', req.body);
  next();
};

export const checkLogedUserMiddleware: ExpressHandler<{}, {}> = (req, res, next) => {
  const logedUser: BaseUser | undefined = getLogedUser();
  if (logedUser) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: No logged-in user' });
  }
};

// export const sessionMiddleware = session({
//   secret: process.env.SESSION_SECRET || 'default_secret', // Use environment variable
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }, // Set to true if using HTTPS
// });
