import { BloodRequest, HospitalOfficial, Patient } from '../../types';

export interface HospitalUsersDao {
  registerHospitalUser(hospitalUser: HospitalOfficial): Promise<void>;

  addPatient(patient: Patient): Promise<void>;

  getPatient(patientNationalId: Patient['patientNationalId']): Promise<Patient | undefined>;

  setBloodRequest(request: BloodRequest): Promise<void>;

  getRequest(request: Partial<BloodRequest>): BloodRequest[];

  getPendingRequest(hospitalId: HospitalOfficial['uHospitalId']): BloodRequest[];

  getRequestHistory(hospitalId: HospitalOfficial['uHospitalId']): BloodRequest[];
}
