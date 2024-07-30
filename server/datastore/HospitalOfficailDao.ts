import { Blood, Blood_stocks, BloodRequest, HospitalOfficial } from '../types';

export interface HospitalOfficialDao {
  register_hospital(hospital_official: HospitalOfficial): void;
  login_hospital(
    email: HospitalOfficial['user']['email'],
    password: HospitalOfficial['user']['password']
  ): void;
  request_blood(request_details: BloodRequest): void;
  search_stocks(type: Blood['type']): Blood_stocks;
  request_history(user_id: HospitalOfficial['user']['user_id']): BloodRequest[];
}
