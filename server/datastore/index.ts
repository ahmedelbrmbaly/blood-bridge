import { AdminDao } from './AdminDao';
import { BankOfficialDao } from './BankOfficialsDao';
import { DonorDao } from './DonorDao';
import { HospitalOfficialDao } from './HospitalOfficailDao';

export interface Datastore
  extends DonorDao,
    AdminDao,
    BankOfficialDao,
    HospitalOfficialDao {}
