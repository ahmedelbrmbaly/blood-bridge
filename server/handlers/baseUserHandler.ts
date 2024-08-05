import { BaseUser, ExpressHandler } from '../types';
import {
  GetUserInfoResponse,
  GetUserStatusResponse,
  GetUserTypeResponse,
  LogInRequest,
  LogInResponse,
  UserIdRequest,
} from '../apis';
import { db } from '../datastore';

// homePageHandler
export const homePageHandler: ExpressHandler<{}, {}> = (req, res) => {
  console.log('HomePageHandler is called');
  console.log('Successful HomePageHandler');
  return res.status(200).render('home', { title: 'Home - Blood Bridge' });
};

// logInHandler
export const logInHandler: ExpressHandler<LogInRequest, LogInResponse> = async (req, res) => {
  console.log('logInHandler is called');
  if (req.method === 'GET') {
    console.log('GET Method ');
    return res.status(200).render('login', { title: 'Login - Blood Bridge' });
  } else if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log('POST Method ');
    console.log(`Login trail with Email: '${email}' and Password: '${password}'`);
    // TODO: Hash Password
    if (!email || !password) {
      console.log('Email or Password is Missing');
      return res.status(400).render('login', {
        title: 'Login - Blood Bridge',
        message: 'Email or Password is Missing',
      });
    }

    const uID: BaseUser['userId'] | any = await db.validateUser(
      email as BaseUser['userEmail'],
      password
    );
    if (!uID) {
      console.log('Email or Password is Wrong');

      return res
        .status(403)
        .render('login', { title: 'Login - Blood Bridge', message: 'Email or Password is Wrong' });
    }
    console.log(`Successful email: '${email}' LogIn`);
    return res.send(uID);
  }
};

//logOutHandler
export const logOutHandler: ExpressHandler<{}, {}> = (req, res) => {
  console.log('logOutHandler is called');
  res.sendStatus(404);
};

//getUserInfoHandler
export const getUserInfoHandler: ExpressHandler<UserIdRequest, GetUserInfoResponse> = async (
  req,
  res
) => {
  console.log('getUserInfoHandler is called');
  const uID = req.body.userId;
  const userInfo: BaseUser['userType'] | any = await db.getUserInfo(uID as BaseUser['userId']);
  if (!userInfo) {
    console.log("Can't find User Info");
    return res.sendStatus(404); // TODO: send message with the status code
  }

  console.log(`User ${uID} Info is ${userInfo}`);
  return res.send(userInfo); // TODO: remove password from return
};

//getUserTypeHandler
export const getUserTypeHandler: ExpressHandler<UserIdRequest, GetUserTypeResponse> = async (
  req,
  res
) => {
  console.log('getUserTypeHandler is called');
  const uID = req.body.userId;
  const userType: BaseUser['userType'] | any = await db.getUserType(uID as BaseUser['userId']);
  if (!userType) {
    console.log("Can't find User Type");
    return res.sendStatus(404); // TODO: send message with the status code
  }
  console.log(`User ${uID} Type is ${userType}`);
  return res.send(userType);
};

//getUserStatusHandler
export const getUserStatusHandler: ExpressHandler<UserIdRequest, GetUserStatusResponse> = async (
  req,
  res
) => {
  console.log('getUserStatusHandler is called');

  const uID = req.body.userId;
  const userStatus: BaseUser['userStatus'] | any = await db.getUserStatus(
    uID as BaseUser['userId']
  );
  if (!userStatus) {
    console.log("Can't find User Status");
    return res.sendStatus(404); // TODO: send message with the status code
  }
  console.log(`User ${uID} Status is ${userStatus}`);
  return res.send(userStatus);
};
