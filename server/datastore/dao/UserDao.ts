import {
  ActiveStatuses,
  Bank,
  BaseUser,
  BloodStocks,
  BloodTypes,
  Cities,
  UserTypes,
} from '../../types';

export interface UsersDao {
  validateUser(
    email: BaseUser['userEmail'],
    password: BaseUser['userPassword']
  ): Promise<BaseUser['userId'] | undefined>;

  getUserInfo(userId: BaseUser['userId']): Promise<BaseUser | undefined>;

  getUserType(userId: BaseUser['userId']): Promise<UserTypes | undefined>;

  getUserStatus(userId: BaseUser['userId']): Promise<ActiveStatuses | undefined>;

  getAvailableStocks(
    bloodType: BloodTypes,
    city: Cities,
    bankId: Bank['bankId']
  ): Promise<BloodStocks>;

  setAvailableStocks(): Promise<void>;

  setNotification(
    notification: Notification,
    senderId: BaseUser['userId'],
    receiverId: BaseUser['userId']
  ): Promise<void>;

  getNotifications(user: BaseUser['userId']): Promise<Notification[]>;

  viewUserProfile(userId: BaseUser['userId']): Promise<Partial<BaseUser> | undefined>;

  updateUserProfile(userId: BaseUser['userId'], updatedInfo: any): Promise<void>;

  deleteUserAccount(userId: BaseUser['userId']): Promise<void>;
}
