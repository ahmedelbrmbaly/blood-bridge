import express, { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { initDb } from './datastore';
import {
  getUserInfoHandler,
  getUserStatusHandler,
  getUserTypeHandler,
  homePageHandler,
  logInHandler,
} from './handlers/baseUserHandler';
import { getDonorInfoHandler } from './handlers/donorHandlers';

(async () => {
  await initDb();
  const app = express();
  app.use(express.json());

  // const posts: any[] = [];

  // Log called routes
  const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
    console.log('New Request', req.path, '-body', req.body);
    next();
  };
  app.use(requestLoggerMiddleware);

  // Log time of request
  app.use((req, res, next) => {
    console.log(Date.now());
    next();
  });

  // Base User route
  app.get('/v1/home', homePageHandler);
  app.get('/v1/login', logInHandler);
  app.get('/v1/user/status', getUserStatusHandler);
  app.get('/v1/user/type', getUserTypeHandler);
  app.get('/v1/user/info', getUserInfoHandler);

  // Donor Routes
  app.get('/v1/donor/info', getDonorInfoHandler);

  app.listen(3000);
})();
