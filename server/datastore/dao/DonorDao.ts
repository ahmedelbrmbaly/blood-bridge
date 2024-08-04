import { Donor, UserTypes } from '../../types';

export interface DonorDao {
  registerDonor(donor: Donor): Promise<Donor | undefined>;

  getDonorInfo(userId: Donor['userId']): Promise<UserTypes | undefined>;
}
