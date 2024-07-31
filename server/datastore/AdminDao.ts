import {
  Admin,
  Bank,
  BankOfficial,
  Donor,
  Hospital,
  HospitalOfficial,
  UserStatus,
} from '../types';

export interface AdminDao {
  registerAdmin(user: Admin): void;
  loginAdmin(
    email: Admin['user_email'],
    password: Admin['user_password']
  ): Admin | null;
  manageDonors(donor: Donor, action: UserStatus): void;
  manageHospital(hospital: Hospital, action: UserStatus): void;

  manageHospitalOfficials(
    user: HospitalOfficial['user_id'],
    action: UserStatus
  ): void;
  manageBanks(bank: Bank, action: UserStatus): void;
  manageBankOfficials(user: BankOfficial['user_id'], action: UserStatus): void;

  addHospital(new_hospita1: Hospital): void;
  addBank(new_bank: Bank): void;

  editDonors(donor_id: Donor['user_id'], updated_info: Partial<Donor>): void;
  editHospital(
    hospital_id: Hospital['hospital_id'],
    updated_info: Partial<Hospital>
  ): void;

  editHospitalOfficials(
    user: HospitalOfficial['user_id'],
    updated_info: Partial<HospitalOfficial>
  ): void;
  editBanks(bank_id: Bank['bank_id'], updated_info: Partial<Bank>): void;
  editBankOfficials(
    user: BankOfficial['user_id'],
    updated_info: Partial<BankOfficial>
  ): void;
  viewAllDonors(): Donor[];
  viewAllHospitals(): Hospital[];
  viewAllHospitalsOfficials(): HospitalOfficial[];
  viewAllBank(): Bank[];
  viewAllBankOfficials(): BankOfficial[];
  updateAdminProfile(
    user_id: Admin['user_id'],
    updatedInfo: Partial<Admin>
  ): void;
}
