import express, { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import { initDb } from './datastore';
import {
  getUserInfoHandler,
  getUserStatusHandler,
  getUserTypeHandler,
  homePageHandler,
  logInHandler,
  logOutHandler,
  registerPageHandler,
  setAvailableStocksHandler,
  setNotificationHandler,
} from './handlers/baseUserHandler';
import {
  donorRegisterHandler,
  getDonationHistoryDonorHandler,
  getDonorInfoHandler,
  setAppointmentHandler,
} from './handlers/donorHandlers';
import { checkLogedUserMiddleware, requestLoggerMiddleware } from './middlewares';
import { BaseUser } from './types';
import {
  addBankHandler,
  addHospitalHandler,
  registerAdminHandler,
  setActiveStatusHandler,
  viewAllHandler,
} from './handlers/AdminHandlers';
import {
  donationHistoryHandler,
  manageAppointmentHandler,
  manageBloodRequestHandler,
  manageVirusTestsHandler,
  registerBankUserHandler,
} from './handlers/BankHandlers';
import {
  registerHospitalUserHandler,
  addPatientHandler,
  bloodRequestHandler,
  pendingRequestHandler,
  requestHistoryHandler,
} from './handlers/HospitalHandalers';

//TODO: use session and JWT for authentication
// memic session
export let logedUser: BaseUser | any = null;
export function setLogedUser(user: BaseUser | any) {
  logedUser = user;
}
export function getLogedUser(): BaseUser | any {
  return logedUser;
}

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
  app.get('/v1/register/donor', donorRegisterHandler);

  // Base User route
  app.get('/v1/home', homePageHandler);
  app.get('/v1/login', logInHandler);
  app.get('/v1/logout', logOutHandler);
  app.post('/v1/login', logInHandler);
  app.get('/v1/register', registerPageHandler);
  app.get('/v1/user/status', getUserStatusHandler);
  app.get('/v1/user/type', getUserTypeHandler);
  app.get('/v1/user/info', getUserInfoHandler);
  app.get('/v1/stocks', setAvailableStocksHandler);
  app.post('/v1/stocks', setAvailableStocksHandler);
  app.get('/v1/notifications', setNotificationHandler);

  // Admin Routes
  app.post('/v1/register/admin', registerAdminHandler);
  app.get('/v1/admin/add-hospital', addHospitalHandler);
  app.post('/v1/admin/add-hospital', addHospitalHandler);
  app.get('/v1/admin/add-bank', addBankHandler);
  app.post('/v1/admin/add-bank', addBankHandler);
  app.get('/v1/admin/manage', setActiveStatusHandler);
  app.post('/v1/admin/manage', setActiveStatusHandler);
  app.get('/v1/admin/view', viewAllHandler);

  // Donor Routes
  app.post('/v1/donor/register', registerBankUserHandler);
  app.get('/v1/donor/info', getDonorInfoHandler);
  app.get('/v1/donor/request-appointment', setAppointmentHandler);
  app.post('/v1/donor/request-appointment', setAppointmentHandler);
  app.get('/v1/donor/request-history', getDonationHistoryDonorHandler);

  // Bank Routes

  app.post('/v1/register/bank-user', registerAdminHandler);
  app.get('/v1/bank/manage-appointments', manageAppointmentHandler);
  app.post('/v1/bank/manage-appointments', manageAppointmentHandler);
  app.get('/v1/bank/manage-appointments', manageBloodRequestHandler);
  app.post('/v1/bank/manage-blood-requests', manageBloodRequestHandler);
  app.get('/v1/bank/manage-blood-requests', manageAppointmentHandler);
  app.post('/v1/bank/manage-tests', manageVirusTestsHandler);
  app.get('/v1/bank/manage-tests', manageVirusTestsHandler);
  app.post('/v1/bank/history', donationHistoryHandler);

  // Hospital Routes
  app.post('/v1/register/hospital-user', registerHospitalUserHandler);
  app.get('/v1/hospital/add-patient', addPatientHandler);
  app.post('/v1/hospital/add-patient', addPatientHandler);
  app.get('/v1/hospital/blood-request', bloodRequestHandler);
  app.post('/v1/hospital/blood-request', bloodRequestHandler);
  app.get('/v1/hospital/pending-request', pendingRequestHandler);
  app.get('/v1/hospital/history', requestHistoryHandler);

  app.listen(3000);
})();
