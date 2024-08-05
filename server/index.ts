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
import { donorRegister, getDonorInfoHandler } from './handlers/donorHandlers';
import { requestLoggerMiddleware } from './middlewares';

(async () => {
  await initDb();

  const expressLayouts = require('express-ejs-layouts');
  const session = require('express-session');
  const bodyParser = require('body-parser');

  const app = express();

  // save session data
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.set('view engine', 'ejs');
  app.use(expressLayouts);
  app.use(bodyParser.json());
  app.use(requestLoggerMiddleware);
  // Log time of request
  app.use((req, res, next) => {
    console.log(Date.now());
    next();
  });

  // Register routes
  app.get('/v1/register/donor', donorRegister);

  // Base User route
  app.get('/v1/home', homePageHandler);
  app.get('/v1/login', logInHandler);
  app.post('/v1/login', logInHandler);
  app.get('/v1/user/status', getUserStatusHandler);
  app.get('/v1/user/type', getUserTypeHandler);
  app.get('/v1/user/info', getUserInfoHandler);
  // Donor Routes
  app.get('/v1/donor/info', getDonorInfoHandler);

  app.listen(3000);
})();
