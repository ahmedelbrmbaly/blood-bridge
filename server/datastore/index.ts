import { DonorDao } from './dao/DonorDao';
import { UserDao } from './dao/UserDao';

export interface Datastore extends DonorDao, UserDao {}
