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
  UserNotification,
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

  // TODO: Do mre validation before running the query
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
    bankId?: Bank['bankId']
  ): Promise<BloodStocks[]> {
    // TODO: Implement bankId
    const aStocks = await this.db.all(
      'SELECT * FROM blood_stocks WHERE bank_city = ? AND blood_type = ?',
      city,
      bloodType
    );
    return aStocks;
  }

  async setAvailableStocks(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async setNotification(
    notification: UserNotification,
    senderId: BaseUser['userId'],
    receiverId: BaseUser['userId']
  ): Promise<void> {
    const messageTypeId = await this.db.get(
      'SELECT message_type_id FROM message_types WHERE message_type = ?',
      notification['messageType']
    );
    const query = await this.db.run(
      ' INSERT INTO notifications (user_id, sender_id, n_message, message_type, is_read VALUES (?, ?, ?, ?, false)',
      receiverId,
      senderId,
      notification['message'],
      messageTypeId
    );
  }

  async getNotifications(user: BaseUser['userId']): Promise<UserNotification[]> {
    // TODO: join with user tables and get names instead of ids
    const notifications = await this.db.all('SELECT * FROM notifications WHERE user_id = ?', user);
    return notifications;
  }

  async viewUserProfile(userId: BaseUser['userId']): Promise<Partial<BaseUser> | undefined> {
    // TODO: show all user data depend on is he donor, admin or offical
    const info = await this.db.get('SELECT * FROM base_users WHERE user_id = ?', userId);
    return info;
  }

  async updateUserProfile(userId: BaseUser['userId'], updatedInfo: any): Promise<void> {
    // Construct the SQL query dynamically based on the fields in updatedInfo
    const fields = Object.keys(updatedInfo)
      .map(key => `${key} = ?`)
      .join(', ');
    const values = Object.values(updatedInfo);

    // Add userId to the values array for the WHERE clause
    values.push(userId);

    // Execute the update query
    await this.db.run(`UPDATE base_users SET ${fields} WHERE user_id = ?`, values);
  }

  async deleteUserAccount(userId: BaseUser['userId']): Promise<void> {
    const statusId = await this.db.get(
      'SELECT active_status_id FROM active_statuses WHERE active_status = DE-ACTIVE'
    );
    const deative = await this.db.run(
      `UPDATE base_users SET active_status = ? WHERE user_id = ?`,
      statusId,
      userId
    );
  }

  // ------------------------------------------------------

  // Admin Methods
  async registerAdmin(user: BaseUser): Promise<void> {
    const query = `
        INSERT INTO base_users (
            user_type, user_name, user_email, user_password, user_city, user_status) VALUES ( (SELECT type_id FROM entities_types WHERE user_type = 'ADMIN'),?, ?, ?, (SELECT city_id FROM cities WHERE city_name = ?), (SELECT active_status_id FROM active_statuses WHERE active_status = 'PENDING'))`;

    await this.db.run(
      query,
      user.userType,
      user.userName,
      user.userEmail,
      user.userPassword,
      user.userCity
    );
  }

  async addHospital(newHospital1: Hospital): Promise<void> {
    const query = `
    INSERT INTO hospitals (hospital_name, hospital_city, hospital_status) VALUES (?, (SELECT city_id FROM cities WHERE city_name = ?), (SELECT active_status_id FROM active_statuses WHERE active_status = 'ACTIVE'))`;

    await this.db.run(query, newHospital1.hospitalName, newHospital1.hospitalCity);
  }

  async addBank(newBank: Bank): Promise<void> {
    const query = `
    INSERT INTO banks (bank_name, bank_city, bank_status) VALUES (?, (SELECT city_id FROM cities WHERE city_name = ?), (SELECT active_status_id FROM active_statuses WHERE active_status = 'ACTIVE'))`;

    await this.db.run(query, newBank.bankName, newBank.bankCity);
  }

  async setActiveStatus(entityType: UserTypes, fId: number, status: ActiveStatuses): Promise<void> {
    let query: string;
    switch (entityType) {
      case 'BANK':
        query = `UPDATE banks SET bank_status = (SELECT active_status_id FROM active_statuses WHERE active_status = ?) WHERE bank_id = ?`;
        break;
      case 'HOSPITAL':
        query = ` UPDATE hospitals SET hospital_status = (SELECT active_status_id FROM active_statuses WHERE active_status = ?) WHERE hospital_id = ?`;
        break;
      default:
        query = `UPDATE base_users SET user_status = (SELECT active_status_id FROM active_statuses WHERE active_status = ?) WHERE user_id = ?`;
        break;
    }

    await this.db.run(query, status, fId);
  }

  async viewAll(entityType: UserTypes): Promise<any[]> {
    let query: string;
    switch (entityType) {
      case 'BANK':
        query = `SELECT * FROM banks`;
        break;
      case 'HOSPITAL':
        query = `SELECT * FROM hospitals`;
        break;
      default:
        query = `SELECT * FROM base_users`;
        break;
    }
    const results = await this.db.all(query);
    return results;
  }

  // ------------------------------------------------------

  // Donor Methods

  async registerDonor(donor: Donor): Promise<void> {
    await this.db.run(
      `INSERT INTO base_users (
            user_type, user_name, user_email, user_password, user_city, user_status) VALUES ( (SELECT type_id FROM entities_types WHERE user_type = 'DONOR'),?, ?, ?, (SELECT city_id FROM cities WHERE city_name = ?), (SELECT active_status_id FROM active_statuses WHERE active_status = 'PENDING'))`,
      donor.userName,
      donor.userEmail,
      donor.userPassword,
      donor.userCity
    );

    const uId = await this.db.get(
      'SELECT user_id FROM base_users WHERE user_email = ? ',
      donor.userEmail
    );

    await this.db.run(
      'INSERT INTO donors (donor_id, national_id, blood_type, last_donation) VALUES (?, ?, (SELECT blood_type_id FROM blood_types WHERE blood_type = ?), ?);',
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
    if (!appointment.donorId || !appointment.bankId || !appointment.bloodType) {
      throw new Error('Invalid appointment data');
    }

    const query = `
      INSERT INTO donations (
          donor_id, bank_id, blood_type, virus_test, donation_status, appointment_requested_at) 
          VALUES (?, ?, (SELECT blood_type_id FROM blood_types WHERE blood_type = ?), (SELECT test_result_id FROM test_results WHERE test_result = 'NOTTESTED'), (SELECT donation_status_id FROM donation_statuses WHERE donation_status = 'PENDING-APPOINTMENT'), ?)
  `;

    await this.db.run(
      query,
      appointment.donorId,
      appointment.bankId,
      appointment.bloodType,
      appointment.aRequestedDate
    );
  }

  async getDonationHistoryDonor(userId: Donor['userId']): Promise<Donation[]> {
    const query = ` SELECT donation_id, bank_id, virus_test, donation_status, appointment_requested_at, appointment_confirmed_date, donation_date, expiration_date FROM donations WHERE donor_id = ?`;

    const donations = await this.db.all(query, userId);

    return donations;
  }

  // ------------------------------------------------------

  // Bank Methods
  async registerBankUser(bankUser: BankOfficial): Promise<void> {
    await this.db.run(
      `INSERT INTO base_users (
            user_type, user_name, user_email, user_password, user_city, user_status) VALUES ( (SELECT type_id FROM entities_types WHERE user_type = 'BANKOFFICIAL'),?, ?, ?, (SELECT city_id FROM cities WHERE city_name = ?), (SELECT active_status_id FROM active_statuses WHERE active_status = 'PENDING'))`,
      bankUser.userName,
      bankUser.userEmail,
      bankUser.userPassword,
      bankUser.userCity
    );

    const uId = await this.db.get(
      'SELECT user_id FROM base_users WHERE user_email = ? ',
      bankUser.userEmail
    );

    await this.db.run(
      'INSERT INTO bank_officials (bank_user_id, bank_id) VALUES (?, (SELECT bank_id FROM banks WHERE bank_name = ?));',
      uId,
      bankUser.bankName
    );
  }

  async setDonationInfo(
    donationID: Donation['donationId'],
    updatedInfo: Partial<Donation>
  ): Promise<void> {
    // Construct the SQL UPDATE query dynamically
    const setClauses = Object.keys(updatedInfo)
      .map(key => `${key} = ?`)
      .join(', ');
    const values = Object.values(updatedInfo);

    const query = `
         UPDATE donations
         SET ${setClauses}
         WHERE donation_id = ?`;

    // Execute the query with the provided donationID and updatedInfo values
    await this.db.run(query, [...values, donationID]);
  }

  async getPendingBloodRequests(
    request: BloodRequest,
    request_status: BloodRequestStatuses
  ): Promise<Donation[]> {
    const query = `
        SELECT d.*
        FROM donations d
        JOIN donation_statuses ds ON d.donation_status = ds.donation_status_id
        WHERE ds.donation_status = 'PENDING-APPOINTMENT'`;
    const results = await this.db.all(query);
    return results;
  }

  async setBloodRequestStatus(
    request: BloodRequest,
    request_status: BloodRequestStatuses
  ): Promise<void> {
    const query = `
        UPDATE blood_requests
        SET request_status = (SELECT blood_request_status_id FROM request_status WHERE request_status = ?)
        WHERE request_id = ?`;

    await this.db.run(query, request_status, request.requestId);
  }

  //OPTIONAL
  async requestDonation(donorsID: Donor['userId'][], bloodType: BloodTypes): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getPendingDonations(bankUser: BankOfficial['userId']): Promise<Donation[]> {
    const query = `
        SELECT d.*
        FROM donations d
        JOIN donation_statuses ds ON d.donation_status = ds.donation_status_id
        WHERE ds.donation_status = 'DONATED' AND d.bank_id = (SELECT bank_id FROM bank_officials WHERE bank_user_id = ?)`;

    const results = await this.db.all(query, bankUser);

    return results;
  }

  async getDonationHistoryBankOfficial(bankUser: BankOfficial['userId']): Promise<Donation[]> {
    const query = `
        SELECT d.*
        FROM donations d
        JOIN banks b ON d.bank_id = b.bank_id
        JOIN bank_officials bo ON b.bank_id = bo.bank_id
        WHERE bo.user_id = ?`;

    const results = await this.db.all(query, bankUser);

    return results;
  }

  // ------------------------------------------------------

  // Hospital Methods

  async registerHospitalUser(hospitalUser: HospitalOfficial): Promise<void> {
    await this.db.run(
      `INSERT INTO base_users (
            user_type, user_name, user_email, user_password, user_city, user_status) VALUES ( (SELECT type_id FROM entities_types WHERE user_type = 'HOSPITALOFFICIAL'),?, ?, ?, (SELECT city_id FROM cities WHERE city_name = ?), (SELECT active_status_id FROM active_statuses WHERE active_status = 'PENDING'))`,
      hospitalUser.userName,
      hospitalUser.userEmail,
      hospitalUser.userPassword,
      hospitalUser.userCity
    );

    const uId = await this.db.get(
      'SELECT user_id FROM base_users WHERE user_email = ? ',
      hospitalUser.userEmail
    );

    await this.db.run(
      'INSERT INTO hospital_officials (hospital_user_id, hospital_id) VALUES (?, (SELECT hospital_id FROM hospitals WHERE hospital_name = ?));',
      uId,
      hospitalUser.hospitalName
    );
  }

  async addPatient(patient: Patient): Promise<void> {
    const query = `
        INSERT INTO patients (
            patient_name, national_id, blood_type, patient_city, patient_status) VALUES (?, ?, 
             (SELECT blood_type_id FROM blood_types WHERE blood_type = ?), 
            (SELECT city_id FROM cities WHERE city_name = ?), 
            (SELECT patient_status_id FROM patient_statuses WHERE patient_status = ?)`;

    await this.db.run(
      query,
      patient.patientName,
      patient.patientNationalId,
      patient.patientBloodType,
      patient.patientCity,
      patient.patient_status
    );
  }

  async getPatient(patientNationalId: Patient['patientNationalId']): Promise<Patient | undefined> {
    if (!patientNationalId) {
      throw new Error('Invalid patient national ID');
    }
    const query = `
      SELECT p.*, bt.blood_type, c.city_name, ps.status_name
      FROM patients p
      JOIN blood_types bt ON p.blood_type = bt.blood_type_id
      JOIN cities c ON p.patient_city = c.city_id
      JOIN patient_statuses ps ON p.patient_status = ps.patient_status_id
      WHERE p.national_id = ?`;

    const result = await this.db.get(query, patientNationalId);

    return result;
  }

  async setBloodRequest(request: BloodRequest): Promise<void> {
    // BUG: The query is not getting ids from database
    const query = `
    INSERT INTO blood_requests (
        hospital_id,bank_id, patient_id, request_status ) 
        VALUES (?, ?, ?, ?)`;

    await this.db.run(query, request.hId, request.bId, request.patientId, request.requestStatus);
  }

  //OPTIONAL
  async getRequest(request: Partial<BloodRequest>): Promise<BloodRequest[]> {
    throw new Error('Method not implemented.');
  }

  //OPTIONAL
  async getPendingRequest(hospitalId: HospitalOfficial['uHospitalId']): Promise<BloodRequest[]> {
    throw new Error('Method not implemented.');
  }

  async getRequestHistory(hospitalId: HospitalOfficial['uHospitalId']): Promise<BloodRequest[]> {
    const query = `
        SELECT 
            br.request_id,
            h.hospital_name,
            b.bank_name,
            p.patient_name,
            br.requested_date,
            br.request_status,
            brs.status_name
        FROM 
            blood_requests br
        JOIN 
            hospitals h ON br.hospital_id = h.hospital_id
        JOIN 
            banks b ON br.bank_id = b.bank_id
        JOIN 
            patients p ON br.patient_id = p.patient_id
        JOIN 
            blood_request_statuses brs ON br.request_status = brs.blood_request_status_id
        WHERE 
            br.hospital_id = ? '`;

    // Execute the query
    const requests = await this.db.all(query, hospitalId);

    // Map the results to the BloodRequest type
    return requests;
  }
}
