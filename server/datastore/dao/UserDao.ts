import { ActiveStatuses, BaseUser, UserTypes } from '../../types';

export interface UserDao {
  validateUser(email: BaseUser['userEmail'], password: BaseUser['userPassword']): BaseUser | null;

  getUserInfo(userId: BaseUser['userId']): UserTypes | null;

  getUserType(userId: BaseUser['userId']): UserTypes | null;

  getUserStatus(userId: BaseUser['userId']): ActiveStatuses | null;
}
