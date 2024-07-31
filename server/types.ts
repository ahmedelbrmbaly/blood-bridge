// Types Definations

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

// Enums Definiations

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
  Not_tested = 'NOT_TESTED',
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

export enum MessageType {
  Confirmed_appoinment = 'Confirmed_appoinment',
  Denied_appoinment = 'Denied_appoinment',
  Confirmed_donation = 'Confirmed_donation',
  Denied_Donation = 'Denied_Donation',
  Donation_call = 'Donation_call',
}

export enum UserStatus {
  active = 'ACTIVE',
  deactive = 'DEACTIVE',
  pending = 'PENDYING',
  unknown = 'UNKNOWN',
}

// interfaces Definiations

export interface BaseUser {
  readonly user_id: ID;
  readonly user_type: UserType;
  user_name: string;
  user_email: Email;
  user_password: Password;
  user_city: CityName;
  user_status: UserStatus;
}

export interface Blood {
  blood_type: BloodType;
  blood_virus_test?: VirusTestResult;
  blood_expiration?: Date;
}

export interface Donor extends BaseUser {
  donor_national_id: NationalID;
  donor_blood_info: Blood;
  donor_last_donation: Date;
}

export interface Hospital {
  readonly hospital_id: ID;
  hospital_name: string;
  hospital_city: CityName;
  hospital_status: UserStatus;
}

export interface HospitalOfficial extends BaseUser {
  readonly hospital_id: Hospital['hospital_id'];
}

export interface Bank {
  readonly bank_id: ID;
  bank_name: string;
  bank_city: CityName;
  bank_status: UserStatus;
}

export interface BankOfficial extends BaseUser {
  readonly bank_id: Bank['bank_id'];
}

export interface Admin extends BaseUser {}

export interface Appointment {
  readonly appointment_id: ID;
  readonly donor_id: Donor['user_id'];
  readonly bank_id: Bank['bank_id'];
  blood_info: Donor['donor_blood_info'];
  appointment_requested_date: Date;
  appointment_status: AppointmentStatus;
  appointment_confirmed_date?: Date;
  appointment_donated: boolean;
  appointment_created_at: Date;
  appointment_updated_at: Date;
}

export interface Donation {
  readonly donation_id: ID;
  readonly donor_id: Donor['user_id'];
  readonly bank_id: Bank['bank_id'];
  donation_blood_info: Donor['donor_blood_info'];
  donation_created_at: Date;
  donation_updated_at: Date;
}

export interface BloodStocks {
  blood_stock: Record<BloodType, Donation[]>;
  bank_id: Bank['bank_id'];
  quantity: NonNegativeInteger;
}

export interface Patient {
  readonly patient_id: ID;
  readonly patient_national_id: NationalID;
  patient_name: string;
  patient_status: PatientStatus;
  patient_blood_type: BloodType;
}

export interface BloodRequest {
  readonly request_id: ID;
  readonly hospital_id: Hospital['hospital_id'];
  readonly bank_id: Bank['bank_id'];
  patient: Patient;
  request_time: Date;
  request_status: BloodRequestStatus;
}

export interface Notification {
  readonly notification_id: ID;
  user_id: BaseUser['user_id'];
  notification_message: string;
  notification_message_type: MessageType;
  notification_read: boolean;
  notification_created_at: Date;
}
