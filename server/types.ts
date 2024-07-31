type ID = string;
type NonNegativeInteger = number & { __brand: 'NonNegativeInteger' };
type Email = string & { __brand: 'Email' };

type Password = string;
type NationalID = string;

export type CityName =
  | 'Cairo'
  | 'Alexandria'
  | 'Gizeh'
  | 'Shubra El-Kheima'
  | 'Port Said'
  | 'Suez'
  | 'Luxor'
  | 'Mansura'
  | 'El-Mahalla El-Kubra'
  | 'Tanta'
  | 'Asyut'
  | 'Ismailia'
  | 'Fayyum'
  | 'Zagazig'
  | 'Aswan'
  | 'Damietta'
  | 'Damanhur'
  | 'Minya'
  | 'Beni Suef'
  | 'Qena'
  | 'Sohag'
  | 'Hurghada'
  | '6th of October City'
  | 'Shibin El Kom'
  | 'Banha'
  | 'Kafr el-Sheikh'
  | 'Arish'
  | 'Mallawi'
  | '10th of Ramadan City'
  | 'Bilbais'
  | 'Marsa Matruh'
  | 'Idfu'
  | 'Mit Ghamr'
  | 'Al-Hamidiyya'
  | 'Desouk'
  | 'Qalyub'
  | 'Abu Kabir'
  | 'Kafr el-Dawwar'
  | 'Girga'
  | 'Akhmim'
  | 'Matareya';

export enum UserType {
  Donor = 'DONOR',
  HospitalOfficial = 'HOSPITAL_OFFICIAL',
  BankOfficial = 'BANK_OFFICIAL',
  Admin = 'ADMIN',
}

export enum BloodType {
  A = 'A+',
  A_ = 'A-',
  B = 'B+',
  B_ = 'B-',
  AB = 'AB+',
  AB_ = 'AB-',
  O = 'O',
  O_ = 'O-',
}

export enum VirusTestResult {
  Positive = 'POSITIVE',
  Negative = 'NEGATIVE',
  Not_tested = 'NOT TESTED',
}

export enum PatientStatus {
  Immediate = 'IMMEDIATE',
  Urgent = 'URGENT',
  Normal = 'NORMAL',
}

export enum AppointmentStatus {
  Pending = 'PENDING',
  Confirmed = 'CONFIRMED',
  Completed = 'COMPLETED',
  Cancelled = 'CANCELLED',
}

export enum BloodRequestStatus {
  Pending = 'PENDING',
  Fulfilled = 'FULFILLED',
  Cancelled = 'CANCELLED',
}

export interface BaseUser {
  readonly user_id: ID;
  readonly user_type: UserType;
  name: string;
  email: Email;
  password: Password;
  city: CityName;
}

export interface Blood {
  type: BloodType;
  virus_test?: VirusTestResult;
  expiration?: Date;
}

export interface Donor extends BaseUser {
  user: BaseUser;
  national_id: NationalID;
  blood_info: Blood;
  last_donation: Date;
}

export interface Hospital {
  readonly hospital_id: ID;
  hospital_name: string;
  city: CityName;
}

export interface HospitalOfficial extends BaseUser {
  user: BaseUser;
  readonly hospital_id: string;
}

export interface Bank {
  readonly bank_id: ID;
  bank_name: string;
  city: CityName;
}

export interface BankOfficial extends BaseUser {
  user: BaseUser;
  readonly bank_id: ID;
}

export interface Admin extends BaseUser {
  user: BaseUser;
}

export interface Appointment {
  readonly user_id: Donor['user_id'];
  readonly bank_id: Bank['bank_id'];
  blood_info: Donor['blood_info'];
  requested_date: Date;
  status: AppointmentStatus;
  confirmed_Date?: Date;
  donated: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Donation {
  readonly donation_id: ID;
  readonly user_id: Donor['user_id'];
  readonly bank_id: Bank['bank_id'];
  blood_info: Donor['blood_info'];
  created_at: Date;
  updated_at: Date;
}

export interface BloodStocks {
  blood_stock: Record<BloodType, Donation[]>;
  bank: Bank;
  quantity: NonNegativeInteger;
}

export interface Patient {
  patient_id: ID;
  name: string;
  status: PatientStatus;
  type: BloodType;
}

export interface BloodRequest {
  readonly request_id: ID;
  readonly hospital_id: Hospital['hospital_id'];
  bank: Bank;
  patient: Patient;
  request_time: Date;
  status: BloodRequestStatus;
}
