import { ActiveStatuses, BaseUser, UserTypes } from '../../types';

export interface UserDao {
  validateUser(
    email: BaseUser['userEmail'],
    password: BaseUser['userPassword']
  ): Promise<BaseUser['userId'] | undefined>;

  getUserInfo(userId: BaseUser['userId']): Promise<BaseUser | undefined>;

  getUserType(userId: BaseUser['userId']): Promise<UserTypes | undefined>;

  getUserStatus(userId: BaseUser['userId']): Promise<ActiveStatuses | undefined>;
}
