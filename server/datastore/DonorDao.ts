import { Donor } from '../types';

export interface DonorDao {
  RegisterDonor(donor: Donor): void;
}
