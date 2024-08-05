import sqlite3 from 'sqlite3';
import { open as sqliteOpen, Database } from 'sqlite';
import path from 'path';

import { Datastore } from '..';
import { Donor, UserTypes, BaseUser, ActiveStatuses } from '../../types';

export class sqlDataStore implements Datastore {
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

  // Base User Interfaces
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

  // Donar Interfaces
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
  async getDonorInfo(userId: Donor['userId']): Promise<Partial<Donor> | undefined> {
    const dInfo = await this.db.get('SELECT * FROM donors WHERE donor_id = ? ', userId);
    return dInfo;
  }
}
