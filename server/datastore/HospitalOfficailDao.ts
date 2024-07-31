import { Blood, BloodStocks, BloodRequest, HospitalOfficial } from '../types';

export interface HospitalOfficialDao {
  registerHospitalOfficial(hospital_official: HospitalOfficial): void;
  loginHospitalOfficial(
    email: HospitalOfficial['user_email'],
    password: HospitalOfficial['user_password']
  ): HospitalOfficial | null;
  requestBlood(request_details: BloodRequest): void;
  searchBloodStocks(type: Blood['blood_type']): BloodStocks;
  getRequestHistory(user_id: HospitalOfficial['user_id']): BloodRequest[];
  updateHospitalOfficialProfile(
    user_id: HospitalOfficial['user_id'],
    updatedInfo: Partial<HospitalOfficial>
  ): void;
  deleteHospitalOfficialAccount(user_id: HospitalOfficial['user_id']): void;
}
