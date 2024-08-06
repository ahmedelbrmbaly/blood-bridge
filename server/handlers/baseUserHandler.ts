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
import { setLogedUser, getLogedUser } from '../index';

// homePageHandler
export const homePageHandler: ExpressHandler<{}, {}> = (req, res) => {
  console.log('HomePageHandler is called');
  console.log('Successful HomePageHandler');

  return res
    .status(200)
    .render('home', { title: 'Home - Blood Bridge', isAuthenticated: getLogedUser() });
};

export const registerPageHandler: ExpressHandler<{}, {}> = (req, res) => {
  return res
    .status(200)
    .render('register', { title: 'register - Blood Bridge', isAuthenticated: getLogedUser() });
};

// logInHandler
export const logInHandler: ExpressHandler<LogInRequest, LogInResponse> = async (req, res) => {
  console.log('logInHandler is called');
  if (req.method === 'GET') {
    console.log('GET Method ');
    return res
      .status(200)
      .render('login', { title: 'register - Blood Bridge', isAuthenticated: getLogedUser() });
  } else if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log('POST Method ');
    console.log(`Login trail with Email: '${email}' and Password: '${password}'`);
    // TODO: Hash Password
    if (!email || !password) {
      console.log('Email or Password is Missing');
      return res.status(400).render('login', {
        title: 'Login - Blood Bridge',
        isAuthenticated: getLogedUser(),
        message: 'Email or Password is Missing',
      });
    }

    const user: BaseUser | any = await db.validateUser(email as BaseUser['userEmail'], password);
    if (!user) {
      console.log('Email or Password is Wrong');

      return res
        .status(403)
        .render('login', {
          title: 'Login - Blood Bridge',
          isAuthenticated: getLogedUser(),
          message: 'Email or Password is Wrong',
        });
    }
    // correct email and password
    console.log(`Successful email: '${email}' LogIn`);
    // req.session.user = user;
    setLogedUser(user);
    console.log(getLogedUser());
    return res.redirect('/v1/home');
  }
};
//logOutHandler
export const logOutHandler: ExpressHandler<{}, {}> = (req, res) => {
  setLogedUser(undefined);
  console.log('logOutHandler is called');
  return res.redirect('/v1/home');
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
