import { ActiveStatuses, Bank, BaseUser, Hospital, UserTypes } from '../../types';

export interface AdminsDao {
  registerAdmin(user: BaseUser): Promise<void>;

  addHospital(newHospital1: Hospital): Promise<void>;
  addBank(newBank: Bank): Promise<void>;

  setActiveStatus(entityType: UserTypes, fId: number, status: ActiveStatuses): Promise<void>;

  // TODO: add methods to edit different entities in the system

  viewAll(entityType: UserTypes): Promise<any[]>;
}
