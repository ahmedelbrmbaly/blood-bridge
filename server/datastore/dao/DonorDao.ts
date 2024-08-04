import { Donor, UserTypes } from '../../types';

export interface DonorDao {
  registerDonor(donor: Donor): void;

  getDonorInfo(userId: Donor['userId']): UserTypes | null;
}
