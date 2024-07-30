import {
  Admin,
  Bank,
  BankOfficial,
  Donor,
  Hospital,
  HospitalOfficial,
} from '../types';

export interface BankOfficialDao {
  register(user: Admin): void;
  login(
    email: Admin['user']['email'],
    password: Admin['user']['password']
  ): void;
  manage_donors(donor: Donor): void;
  manage_hospital(hospital: Hospital): void;
  manage_hospital_Officials(user: HospitalOfficial['user']): void;
  manage_bank(bank: Bank): void;
  manage_bank_Officials(user: BankOfficial['user']): void;
}
