import {
  Appointment,
  BankOfficial,
  BloodRequest,
  Donation,
  Donor,
} from '../types';

export interface BankOfficialDao {
  register_bank(user: BankOfficial): void;
  login_bank(
    email: BankOfficial['user']['email'],
    password: BankOfficial['user']['password']
  ): void;
  manage_appointment(appointment: Appointment): Appointment;
  validate_donation(appointment: Appointment): Donation | void;
  add_stocks(donation: Donation): void;
  manage_request(request: BloodRequest): boolean;
  notify_donors(request: BloodRequest): Donor;
}
