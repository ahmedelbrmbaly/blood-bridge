import { Datastore } from '../';
import {
  Donor,
  Appointment,
  Donation,
  Admin,
  Hospital,
  HospitalOfficial,
  Bank,
  BankOfficial,
  BloodRequest,
  Blood,
  BloodStocks,
  BaseUser,
} from '../../types';

export class InMemoryDataStore implements Datastore {
  // In memory arrays
  private admin: Admin[] = [];
  private donors: Donor[] = [];
  private hospital_user: HospitalOfficial[] = [];
  private bank_user: BankOfficial[] = [];
  private donations: Donation[] = [];
  private appointments: Appointment[] = [];
  private hospitals: Hospital[] = [];
  private banks: Bank[] = [];
  private bloods: Blood[] = [];
  private blood_requests: BloodRequest[] = [];
  private blood_stocks: BloodStocks[] = [];
  private notifications: Notification[] = [];

  registerDonor(donor: Donor): void {
    // Check if a donor with the same email already exists
    const existingDonor = this.donors.find(
      d => d['user_email'] === donor['user_email']
    );
    if (existingDonor) {
      throw new Error('A donor with this email already exists');
    }

    // If not, add the new donor to our array
    this.donors.push(donor);
  }

  loginDonor(
    email: Donor['user_email'],
    password: Donor['user_password']
  ): Donor | null {
    // Find a donor with matching email and password
    const donor = this.donors.find(
      d => d['user_email'] === email && d['user_password'] === password
    );

    // If found, return the donor. If not, return null
    return donor || null;
  }

  requestAppointment(appointment: Appointment): void {
    // Add the new appointment to our array
    this.appointments.push(appointment);
  }

  getDonationHistoryDonor(donor_id: Donor['user_id']): Donation[] {
    // Filter donations to only include those from this donor
    return this.donations.filter(d => d['donor_id'] === donor_id);
  }

  getAppointmentHistoryDonor(donor_id: Donor['user_id']): Appointment[] {
    // Filter appointments to only include those from this donor
    return this.appointments.filter(a => a['donor_id'] === donor_id);
  }

  getNotifications(donor_id: BaseUser['user_id']): Notification[] {
    return this.notifications.filter(notification => {
      return notification['user_id'] === donor_id;
    });
  }

  updateDonorProfile(
    donor_id: Donor['user_id'],
    updatedInfo: Partial<Donor>
  ): void {
    // Find the index of the donor in our array
    const index = this.donors.findIndex(d => d['user_id'] === donor_id);

    if (index !== -1) {
      // If found, update the donor's information
      this.donors[index] = { ...this.donors[index], ...updatedInfo };
    } else {
      throw new Error('Donor not found');
    }
  }

  deleteDonorAccount(donor_id: Donor['user_id']): void {
    // Filter out the donor with the specified ID
    this.donors = this.donors.filter(d => d['user_id'] !== donor_id);
  }
  registerAdmin(user: Admin): void {
    throw new Error('Method not implemented.');
  }
  loginAdmin(
    email: Admin['user_email'],
    password: Admin['user_password']
  ): Admin | null {
    throw new Error('Method not implemented.');
  }
  manageDonors(donor: Donor, action: 'activate' | 'deactivate'): void {
    throw new Error('Method not implemented.');
  }
  manage_hospital(
    hospital: Hospital,
    action: 'add' | 'deactivate' | 'edit'
  ): void {
    throw new Error('Method not implemented.');
  }
  manageHospitalOfficials(
    user: HospitalOfficial['user_id'],
    action: 'activate' | 'deactivate'
  ): void {
    throw new Error('Method not implemented.');
  }
  manageBanks(bank: Bank, action: 'add' | 'deactivate' | 'edit'): void {
    throw new Error('Method not implemented.');
  }
  manageBankOfficials(
    user: BankOfficial['user_id'],
    action: 'activate' | 'deactivate'
  ): void {
    throw new Error('Method not implemented.');
  }
  viewAllDonors(): Donor[] {
    throw new Error('Method not implemented.');
  }
  viewAllHospitals(): Hospital[] {
    throw new Error('Method not implemented.');
  }
  viewAllHospitalsOfficials(): HospitalOfficial[] {
    throw new Error('Method not implemented.');
  }
  viewAllBank(): Bank[] {
    throw new Error('Method not implemented.');
  }
  viewAllBankOfficials(): BankOfficial[] {
    throw new Error('Method not implemented.');
  }
  updateAdminProfile(
    user_id: Admin['user_id'],
    updatedInfo: Partial<Admin>
  ): void {
    throw new Error('Method not implemented.');
  }
  registerBankOfficial(user: BankOfficial): void {
    throw new Error('Method not implemented.');
  }
  loginBankOfficial(
    email: BankOfficial['user_email'],
    password: BankOfficial['user_password']
  ): BankOfficial | null {
    throw new Error('Method not implemented.');
  }
  manageAppointment(appointment: Appointment): Appointment {
    throw new Error('Method not implemented.');
  }
  validateDonation(appointment: Appointment): Donation | null {
    throw new Error('Method not implemented.');
  }
  addStocks(donation: Donation): void {
    throw new Error('Method not implemented.');
  }
  manageBloodRequest(request: BloodRequest): void {
    throw new Error('Method not implemented.');
  }
  notifyDonors(request: BloodRequest): Donor {
    throw new Error('Method not implemented.');
  }
  getAppointmentHistoryBankOfficial(bank: Bank): Appointment[] {
    throw new Error('Method not implemented.');
  }
  getDonationHistoryBankOfficial(bank: Bank): Donation[] {
    throw new Error('Method not implemented.');
  }
  updateBankOfficialProfile(
    user_id: BankOfficial['user_id'],
    updatedInfo: Partial<BankOfficial>
  ): void {
    throw new Error('Method not implemented.');
  }
  deleteBankOfficialAccount(user_id: BankOfficial['user_id']): void {
    throw new Error('Method not implemented.');
  }
  registerHospitalOfficial(hospital_official: HospitalOfficial): void {
    throw new Error('Method not implemented.');
  }
  loginHospitalOfficial(
    email: HospitalOfficial['user_email'],
    password: HospitalOfficial['user_password']
  ): HospitalOfficial | null {
    throw new Error('Method not implemented.');
  }
  requestBlood(request_details: BloodRequest): void {
    throw new Error('Method not implemented.');
  }
  searchBloodStocks(type: Blood['blood_type']): BloodStocks {
    throw new Error('Method not implemented.');
  }
  getRequestHistory(user_id: HospitalOfficial['user_id']): BloodRequest[] {
    throw new Error('Method not implemented.');
  }
  updateHospitalOfficialProfile(
    user_id: HospitalOfficial['user_id'],
    updatedInfo: Partial<HospitalOfficial>
  ): void {
    throw new Error('Method not implemented.');
  }
  deleteHospitalOfficialAccount(user_id: HospitalOfficial['user_id']): void {
    throw new Error('Method not implemented.');
  }
}
