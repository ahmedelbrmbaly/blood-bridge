import {
  Appointment,
  Bank,
  BankOfficial,
  BloodRequest,
  Donation,
  Donor,
} from '../types';

export interface BankOfficialDao {
  registerBankOfficial(user: BankOfficial): void;
  loginBankOfficial(
    email: BankOfficial['email'],
    password: BankOfficial['password']
  ): BankOfficial | null;
  manageAppointment(appointment: Appointment): Appointment;
  validateDonation(appointment: Appointment): Donation | null;
  addStocks(donation: Donation): void;
  manageBloodRequest(request: BloodRequest): void;
  notifyDonors(request: BloodRequest): Donor;
  getAppointmentHistory(bank: Bank): Appointment[];
  getDonationHistory(bank: Bank): Donation[];
  updateProfile(
    user_id: BankOfficial['user_id'],
    updatedInfo: Partial<BankOfficial>
  ): void;
  deleteAccount(user_id: BankOfficial['user_id']): void;
}
