import {
  Admin,
  Bank,
  BankOfficial,
  Donor,
  Hospital,
  HospitalOfficial,
} from '../types';

export interface AdminDao {
  registerAdmin(user: Admin): void;
  loginAdmin(
    email: Admin['user_email'],
    password: Admin['user_password']
  ): Admin | null;
  manageDonors(donor: Donor, action: 'activate' | 'deactivate'): void;
  manage_hospital(
    hospital: Hospital,
    action: 'add' | 'deactivate' | 'edit'
  ): void;

  manageHospitalOfficials(
    user: HospitalOfficial['user_id'],
    action: 'activate' | 'deactivate'
  ): void;
  manageBanks(bank: Bank, action: 'add' | 'deactivate' | 'edit'): void;
  manageBankOfficials(
    user: BankOfficial['user_id'],
    action: 'activate' | 'deactivate'
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
