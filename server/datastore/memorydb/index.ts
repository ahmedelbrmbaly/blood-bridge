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
  UserStatus,
} from '../../types';

export class InMemoryDataStore implements Datastore {
  // In memory arrays
  private admins: Admin[] = [];
  private donors: Donor[] = [];
  private hospital_users: HospitalOfficial[] = [];
  private bank_users: BankOfficial[] = [];
  private donations: Donation[] = [];
  private appointments: Appointment[] = [];
  private hospitals: Hospital[] = [];
  private banks: Bank[] = [];
  private bloods: Blood[] = [];
  private blood_requests: BloodRequest[] = [];
  private blood_stocks: BloodStocks[] = [];
  private notifications: Notification[] = [];

  // Donor Methods
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

  // Admin Methods

  registerAdmin(user: Admin): void {
    // Check if a donor with the same email already exists
    const existingAdmin = this.admins.find(
      d => d['user_email'] === user['user_email']
    );
    if (existingAdmin) {
      throw new Error('An admin with this email already exists');
    }

    // If not, add the new donor to our array
    this.admins.push(user);
  }

  loginAdmin(
    email: Admin['user_email'],
    password: Admin['user_password']
  ): Admin | null {
    // Find a donor with matching email and password
    const admin = this.admins.find(
      d => d['user_email'] === email && d['user_password'] === password
    );

    // If found, return the donor. If not, return null
    return admin || null;
  }

  manageDonors(donor: Donor, action: UserStatus): void {
    const index = this.donors.findIndex(d => d.user_id === donor.user_id);
    if (index === -1) {
      throw new Error('Donor not found');
    }
    this.donors[index]['user_status'] = action;
  }

  manageHospital(hospital: Hospital, action: UserStatus): void {
    const index = this.hospitals.findIndex(
      d => d.hospital_id === hospital.hospital_id
    );
    if (index === -1) {
      throw new Error('Hospital not found');
    }
    this.hospitals[index]['hospital_status'] = action;
  }
  manageHospitalOfficials(
    user: HospitalOfficial['user_id'],
    action: UserStatus
  ): void {
    const index = this.hospital_users.findIndex(d => d.user_id === user);
    if (index === -1) {
      throw new Error('Hospital Official not found');
    }
    this.hospital_users[index]['user_status'] = action;
  }
  manageBanks(bank: Bank, action: UserStatus): void {
    const index = this.banks.findIndex(d => d.bank_id === bank.bank_id);
    if (index === -1) {
      throw new Error('Bank not found');
    }
    this.banks[index]['bank_status'] = action;
  }
  manageBankOfficials(user: BankOfficial['user_id'], action: UserStatus): void {
    const index = this.bank_users.findIndex(d => d.bank_id === user);
    if (index === -1) {
      throw new Error('Bank Official not found');
    }
    this.bank_users[index]['user_status'] = action;
  }
  addBank(new_bank: Bank): void {
    if (
      this.banks.find(
        b =>
          b.bank_name === new_bank.bank_name &&
          b.bank_city === new_bank.bank_city
      )
    ) {
      throw new Error('Bank already exists');
    }
    this.banks.push(new_bank);
  }
  addHospital(new_hospita1: Hospital): void {
    if (
      this.hospitals.find(
        h =>
          h.hospital_name === new_hospita1.hospital_name &&
          h.hospital_city === new_hospita1.hospital_city
      )
    ) {
      throw new Error('Hospital already exists');
    }

    this.hospitals.push(new_hospita1);
  }

  editDonors(donor_id: Donor['user_id'], updated_info: Partial<Donor>): void {
    const index = this.donors.findIndex(d => d['user_id'] === donor_id);

    if (index !== -1) {
      // If found, update the donor's information
      this.donors[index] = { ...this.donors[index], ...updated_info };
    } else {
      throw new Error('Donor not found');
    }
  }
  editHospital(
    hospital_id: Hospital['hospital_id'],
    updated_info: Partial<Hospital>
  ): void {
    const index = this.hospitals.findIndex(
      d => d['hospital_id'] === hospital_id
    );

    if (index !== -1) {
      // If found, update the donor's information
      this.hospitals[index] = { ...this.hospitals[index], ...updated_info };
    } else {
      throw new Error('Hospital not found');
    }
  }
  editHospitalOfficials(
    user: HospitalOfficial['user_id'],
    updated_info: Partial<HospitalOfficial>
  ): void {
    const index = this.hospital_users.findIndex(d => d['user_id'] === user);

    if (index !== -1) {
      // If found, update the donor's information
      this.hospital_users[index] = {
        ...this.hospital_users[index],
        ...updated_info,
      };
    } else {
      throw new Error('Hospital Official not found');
    }
  }
  editBanks(bank_id: Bank['bank_id'], updated_info: Partial<Bank>): void {
    const index = this.banks.findIndex(d => d['bank_id'] === bank_id);

    if (index !== -1) {
      // If found, update the donor's information
      this.banks[index] = { ...this.banks[index], ...updated_info };
    } else {
      throw new Error('Bank not found');
    }
  }
  editBankOfficials(
    user: BankOfficial['user_id'],
    updated_info: Partial<BankOfficial>
  ): void {
    const index = this.bank_users.findIndex(d => d['user_id'] === user);

    if (index !== -1) {
      // If found, update the donor's information
      this.bank_users[index] = {
        ...this.bank_users[index],
        ...updated_info,
      };
    } else {
      throw new Error('Bank Official not found');
    }
  }
  viewAllDonors(): Donor[] {
    return this.donors;
  }
  viewAllHospitals(): Hospital[] {
    return this.hospitals;
  }
  viewAllHospitalsOfficials(): HospitalOfficial[] {
    return this.hospital_users;
  }
  viewAllBank(): Bank[] {
    return this.banks;
  }
  viewAllBankOfficials(): BankOfficial[] {
    return this.bank_users;
  }
  updateAdminProfile(
    user_id: Admin['user_id'],
    updatedInfo: Partial<Admin>
  ): void {
    const index = this.admins.findIndex(a => a.user_id === user_id);
    if (index === -1) {
      throw new Error('Admin not found');
    }
    this.admins[index] = { ...this.admins[index], ...updatedInfo };
  }

  // Bank Officals methods
  registerBankOfficial(user: BankOfficial): void {
    // to be edit i must search all users not only bank users
    const existingUser = this.bank_users.find(
      d => d['user_email'] === user['user_email']
    );
    if (existingUser) {
      throw new Error('A user with this email already exists');
    }

    // If not, add the new donor to our array
    this.bank_users.push(user);
  }

  loginBankOfficial(
    email: BankOfficial['user_email'],
    password: BankOfficial['user_password']
  ): BankOfficial | null {
    const user = this.bank_users.find(
      d => d['user_email'] === email && d['user_password'] === password
    );

    // If found, return the donor. If not, return null
    return user || null;
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
