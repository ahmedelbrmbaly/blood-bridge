import { GetDonorInfoResponse, UserIdRequest } from '../apis';
import { db } from '../datastore';
import { Donor, ExpressHandler } from '../types';

export const donorRegister: ExpressHandler<{}, {}> = (req, res) => {
  console.log('donorRegisterHandler is called');

  return res.status(200).render('register', { title: 'Register - Blood Bridge' });
};

// TODO: Get Donor Info joining Users table
export const getDonorInfoHandler: ExpressHandler<UserIdRequest, GetDonorInfoResponse> = async (
  req,
  res
) => {
  console.log('getDonorInfoHandler is called');
  const dID = req.body.userId;
  const donorInfo: Donor | any = await db.getDonorInfo(dID as Donor['userId']);
  if (!donorInfo) {
    console.log("Can't find Donor Info");
    return res.sendStatus(404); // TODO: send message with the status code
  }

  console.log(`User ${dID} Info is ${donorInfo}`);
  return res.send(donorInfo); // TODO: remove password from return
};
