import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

import { Datastore } from '..';
import { Donor, UserTypes, BaseUser, ActiveStatuses } from '../../types';

export class sqlDataStore implements Datastore {
  public async openDb() {
    // open the database
    const db = await open({
      filename: path.join(__dirname, 'bloodbridge.sqlite'),
      driver: sqlite3.Database,
    });

    await db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });
    return this;
  }

  registerDonor(donor: Donor): Promise<Donor | undefined> {
    throw new Error('Method not implemented.');
  }
  getDonorInfo(userId: Donor['userId']): Promise<UserTypes | undefined> {
    throw new Error('Method not implemented.');
  }
  validateUser(
    email: BaseUser['userEmail'],
    password: BaseUser['userPassword']
  ): Promise<BaseUser | undefined> {
    throw new Error('Method not implemented.');
  }
  getUserInfo(userId: BaseUser['userId']): Promise<UserTypes | undefined> {
    throw new Error('Method not implemented.');
  }
  getUserType(userId: BaseUser['userId']): Promise<UserTypes | undefined> {
    throw new Error('Method not implemented.');
  }
  getUserStatus(userId: BaseUser['userId']): Promise<ActiveStatuses | undefined> {
    throw new Error('Method not implemented.');
  }
}
