import {
  Appointment,
  AppointmentStatus,
  Bank,
  BankOfficial,
  Blood,
  BloodRequest,
  BloodRequestStatus,
  Donation,
  Donor,
  VirusTestResult,
} from '../types';

export interface BankOfficialDao {
  registerBankOfficial(user: BankOfficial): void;

  loginBankOfficial(
    email: BankOfficial['user_email'],
    password: BankOfficial['user_password']
  ): BankOfficial | null;

  manageAppointment(
    new_appointment: Appointment,
    status: AppointmentStatus,
    updated_at: Date,
    confirmed_date?: Date,
    is_donated?: boolean
  ): Appointment;

  virusTest(
    appointment: Appointment,
    test_result: VirusTestResult
  ): Appointment | null;

  addStocks(donation: Donation): void;

  manageBloodRequest(
    request: BloodRequest,
    request_status: BloodRequestStatus
  ): void;

  notifyDonors(request: BloodRequest): Donor;

  getAppointmentHistoryBankOfficial(bank: Bank): Appointment[];

  getDonationHistoryBankOfficial(bank: Bank): Donation[];
  updateBankOfficialProfile(
    user_id: BankOfficial['user_id'],
    updatedInfo: Partial<BankOfficial>
  ): void;

  deleteBankOfficialAccount(user_id: BankOfficial['user_id']): void;
}
