import { AdminsDao } from './dao/AdminDao';
import { DonorsDao } from './dao/DonorDao';
import { HospitalUsersDao } from './dao/HospitalUsersDao';
import { UsersDao } from './dao/UserDao';
import { sqlDataStore } from './sql';

export interface Datastore extends DonorsDao, UsersDao, AdminsDao, HospitalUsersDao {}

export let db: Datastore;

export async function initDb() {
  db = await new sqlDataStore().openDb();
}
