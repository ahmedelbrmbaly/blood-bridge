import { DonorDao } from './dao/DonorDao';
import { UserDao } from './dao/UserDao';
import { sqlDataStore } from './sql';

export interface Datastore extends DonorDao, UserDao {}

export let db: Datastore;

export async function initDb() {
  db = await new sqlDataStore().openDb();
}
