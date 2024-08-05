import { Donor, UserTypes } from '../../types';

export interface DonorDao {
  registerDonor(donor: Donor): Promise<void>;

  getDonorInfo(userId: Donor['userId']): Promise<Partial<Donor> | undefined>;
}
