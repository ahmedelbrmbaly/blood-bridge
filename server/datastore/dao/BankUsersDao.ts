import {
  BankOfficial,
  BaseUser,
  BloodRequest,
  BloodRequestStatuses,
  BloodTypes,
  Donation,
  Donor,
} from '../../types';

export interface BankUsersDao {
  registerBankUser(bankUser: BankOfficial): Promise<void>;

  setDonationInfo(
    donationID: Donation['donationId'],
    updatedInfo: Partial<Donation>
  ): Promise<void>;

  getPendingBloodRequests(
    request: BloodRequest,
    request_status: BloodRequestStatuses
  ): Promise<Donation[]>;

  setBloodRequestStatus(request: BloodRequest, request_status: BloodRequestStatuses): Promise<void>;

  requestDonation(donorsID: Donor['userId'][], bloodType: BloodTypes): Promise<void>;

  getPendingDonations(bankUser: BankOfficial['userId']): Promise<Donation[]>;

  getDonationHistoryBankOfficial(bankUser: BankOfficial['userId']): Promise<Donation[]>;
}
