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
    email: BankOfficial['user_email'],
    password: BankOfficial['user_password']
  ): BankOfficial | null;
  manageAppointment(appointment: Appointment): Appointment;
  validateDonation(appointment: Appointment): Donation | null;
  addStocks(donation: Donation): void;
  manageBloodRequest(request: BloodRequest): void;
  notifyDonors(request: BloodRequest): Donor;
  getAppointmentHistoryBankOfficial(bank: Bank): Appointment[];
  getDonationHistoryBankOfficial(bank: Bank): Donation[];
  updateBankOfficialProfile(
    user_id: BankOfficial['user_id'],
    updatedInfo: Partial<BankOfficial>
  ): void;
  deleteBankOfficialAccount(user_id: BankOfficial['user_id']): void;
}
