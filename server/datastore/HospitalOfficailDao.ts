import { Blood, BloodStocks, BloodRequest, HospitalOfficial, BloodRequestStatus, Donation } from '../types';

export interface HospitalOfficialDao {
  registerHospitalOfficial(hospital_official: HospitalOfficial): void;
  loginHospitalOfficial(
    email: HospitalOfficial['user_email'],
    password: HospitalOfficial['user_password']
  ): HospitalOfficial | null;
  requestBlood(request_details: BloodRequest, request_status: BloodRequestStatus;): void;
  searchBloodStocks(type: Blood['blood_type']): BloodStocks;
  getRequestHistory(): BloodRequest[];
  getDonationHistory(): Donation[];
  updateHospitalOfficialProfile(
    user_id: HospitalOfficial['user_id'],
    updatedInfo: Partial<HospitalOfficial>
  ): void;
  deleteHospitalOfficialAccount(user_id: HospitalOfficial['user_id']): void;
}
