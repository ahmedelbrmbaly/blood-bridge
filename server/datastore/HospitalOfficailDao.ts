import { Blood, BloodStocks, BloodRequest, HospitalOfficial } from '../types';

export interface HospitalOfficialDao {
  registerHospitalOfficial(hospital_official: HospitalOfficial): void;
  loginHospitalOfficial(
    email: HospitalOfficial['email'],
    password: HospitalOfficial['password']
  ): HospitalOfficial | null;
  requestBlood(request_details: BloodRequest): void;
  searchBloodStocks(type: Blood['type']): BloodStocks;
  getRequestHistory(user_id: HospitalOfficial['user_id']): BloodRequest[];
  updateProfile(
    user_id: HospitalOfficial['user_id'],
    updatedInfo: Partial<HospitalOfficial>
  ): void;
  deleteAccount(user_id: HospitalOfficial['user_id']): void;
}
