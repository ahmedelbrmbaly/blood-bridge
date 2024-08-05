import { BaseUser, Donation, Donor, UserTypes } from '../../types';

export interface DonorsDao {
  registerDonor(donor: Donor): Promise<void>;

  getDonorInfo(userId: Donor['userId']): Promise<Partial<Donor> | undefined>;

  setAppointment(appointment: Donation): Promise<void>;

  getDonationHistoryDonor(userId: Donor['userId']): Promise<Donation[]>;
}
