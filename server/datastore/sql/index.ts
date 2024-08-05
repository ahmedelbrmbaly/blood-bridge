import sqlite3 from 'sqlite3';
import { open as sqliteOpen, Database } from 'sqlite';
import path from 'path';

import { Datastore } from '..';
import {
  Donor,
  UserTypes,
  BaseUser,
  ActiveStatuses,
  Bank,
  BloodRequest,
  BloodStocks,
  BloodTypes,
  Cities,
  Donation,
  Hospital,
  HospitalOfficial,
  Patient,
  BankOfficial,
  BloodRequestStatuses,
} from '../../types';

export class sqlDataStore implements Datastore {
  // DAtabase connection
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  public async openDb() {
    // open the database
    this.db = await sqliteOpen({
      filename: path.join(__dirname, 'bloodbridge.sqlite'),
      driver: sqlite3.Database,
    });

    this.db.run('PRAGMA foreign_keys = ON;');

    await this.db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });
    return this;
  }

  // --------------------------------------------------
  // Base User Methods

  async validateUser(
    email: BaseUser['userEmail'],
    password: BaseUser['userPassword']
  ): Promise<BaseUser['userId'] | undefined> {
    const userId: BaseUser['userId'] | any = await this.db.get<BaseUser>(
      'SELECT user_id from base_users where user_email = ? and user_password = ?',
      email,
      password
    );
    return userId;
  }

  async getUserInfo(userId: BaseUser['userId']): Promise<BaseUser | undefined> {
    const uInfo = await this.db.get('SELECT * FROM base_users WHERE user_id = ? ', userId);
    return uInfo;
  }
  async getUserType(userId: BaseUser['userId']): Promise<UserTypes | undefined> {
    const uType = await this.db.get('SELECT user_type FROM base_users WHERE user_id = ? ', userId);
    return uType;
  }
  async getUserStatus(userId: BaseUser['userId']): Promise<ActiveStatuses | undefined> {
    const uStatus = await this.db.get(
      'SELECT user_status FROM base_users WHERE user_id = ? ',
      userId
    );
    return uStatus;
  }

  async getAvailableStocks(
    bloodType: BloodTypes,
    city: Cities,
    bankId: Bank['bankId']
  ): Promise<BloodStocks> {
    throw new Error('Method not implemented.');
  }

  async setAvailableStocks(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async setNotification(
    notification: Notification,
    senderId: BaseUser['userId'],
    receiverId: BaseUser['userId']
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getNotifications(user: BaseUser['userId']): Promise<Notification[]> {
    throw new Error('Method not implemented.');
  }

  async viewUserProfile(userId: BaseUser['userId']): Promise<Partial<BaseUser> | undefined> {
    throw new Error('Method not implemented.');
  }

  async updateUserProfile(userId: BaseUser['userId'], updatedInfo: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async deleteUserAccount(userId: BaseUser['userId']): Promise<void> {
    throw new Error('Method not implemented.');
  }
  // ------------------------------------------------------
  // Admin Methods
  async registerAdmin(user: BaseUser): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async addHospital(newHospital1: Hospital): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async addBank(newBank: Bank): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async setActiveStatus(entityType: UserTypes, fId: number, status: ActiveStatuses): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async viewAll(entityType: UserTypes): Promise<[]> {
    throw new Error('Method not implemented.');
  }
  // ------------------------------------------------------
  // Donor Methods

  async registerDonor(donor: Donor): Promise<void> {
    await this.db.run(
      'INSERT INTO base_users (user_type, user_name, user_email, user_password, user_city, user_status) VALUES (?, ?, ?, ?, ?, ?)',
      donor.userType,
      donor.userName,
      donor.userEmail,
      donor.userPassword,
      donor.userCity,
      donor.userCity
    );

    const uId = await this.db.get(
      'SELECT user_id FROM base_users WHERE user_email = ? ',
      donor.userEmail
    );

    await this.db.run(
      'INSERT INTO donors (donor_id, national_id, blood_type, last_donation) VALUES (?, ?, ?, ?);',
      uId,
      donor.dNationalId,
      donor.dBloodType,
      donor.dLastDonation
    );
  }

  // TODO: Get Donor Info joining Users table
  async getDonorInfo(userId: Donor['userId']): Promise<Partial<Donor> | undefined> {
    const dInfo = await this.db.get('SELECT * FROM donors WHERE donor_id = ? ', userId);
    return dInfo;
  }

  async setAppointment(appointment: Donation): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getDonationHistoryDonor(userId: Donor['userId']): Promise<Donation[]> {
    throw new Error('Method not implemented.');
  }

  // ------------------------------------------------------
  // Bank Methods
  async registerBankUser(bankUser: BankOfficial): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async setDonationInfo(
    donationID: Donation['donationId'],
    updatedInfo: Partial<Donation>
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getPendingBloodRequests(
    request: BloodRequest,
    request_status: BloodRequestStatuses
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async setBloodRequestStatus(
    request: BloodRequest,
    request_status: BloodRequestStatuses
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async requestDonation(donorsID: Donor['userId'][], bloodType: BloodTypes): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getPendingDonations(bankUser: BankOfficial['userId']): Promise<Donation[]> {
    throw new Error('Method not implemented.');
  }
  async getDonationHistoryBankOfficial(bankUser: BankOfficial['userId']): Promise<Donation[]> {
    throw new Error('Method not implemented.');
  }
  // ------------------------------------------------------
  // Hospital Methods
  async registerHospitalUser(hospitalUser: HospitalOfficial): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async addPatient(patient: Patient): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getPatient(patientNationalId: Patient['patientNationalId']): Promise<Patient | undefined> {
    throw new Error('Method not implemented.');
  }
  async setBloodRequest(request: BloodRequest): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getRequest(request: Partial<BloodRequest>): Promise<BloodRequest[]> {
    throw new Error('Method not implemented.');
  }
  async getPendingRequest(hospitalId: HospitalOfficial['uHospitalId']): Promise<BloodRequest[]> {
    throw new Error('Method not implemented.');
  }
  async getRequestHistory(hospitalId: HospitalOfficial['uHospitalId']): Promise<BloodRequest[]> {
    throw new Error('Method not implemented.');
  }
}
