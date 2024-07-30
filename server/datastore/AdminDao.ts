import {
  Admin,
  Bank,
  BankOfficial,
  Donor,
  Hospital,
  HospitalOfficial,
} from '../types';

export interface AdminDao {
  register_admin(user: Admin): void;
  login_admin(
    email: Admin['user']['email'],
    password: Admin['user']['password']
  ): void;
  manage_donors(donor: Donor): void;
  manage_hospital(hospital: Hospital): void;
  manage_hospital_Officials(user: HospitalOfficial['user']): void;
  manage_bank(bank: Bank): void;
  manage_bank_Officials(user: BankOfficial['user']): void;
}
