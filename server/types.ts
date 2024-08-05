import { RequestHandler } from 'express';
import { Session } from 'express-session';

export type ExpressHandler<Req, Res> = RequestHandler<string, Partial<Res>, Partial<Req>, any>;

// Types Definations
type ID = number;
type NonNegativeInteger = number & { __brand: 'NonNegativeInteger' };
type Email = string & { __brand: 'Email' };
type Password = string;
type NationalID = string;

export type Cities =
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

export enum UserTypes {
  Donor = 'DONOR',
  HospitalOfficial = 'HOSPITAL_OFFICIAL',
  BankOfficial = 'BANK_OFFICIAL',
  Admin = 'ADMIN',
  Bank = 'BANK',
  Hospital = 'HOSPITAL',
}

export enum ActiveStatuses {
  Active = 'ACTIVE',
  Deactive = 'DE-ACTIVE',
  Pending = 'PENDING',
  Unknown = 'UNKNOWN',
}
export enum BloodTypes {
  A = 'A+',
  A_ = 'A-',
  B = 'B+',
  B_ = 'B-',
  AB = 'AB+',
  AB_ = 'AB-',
  O = 'O',
  O_ = 'O-',
}

export enum TestResults {
  Positive = 'POSITIVE',
  Negative = 'NEGATIVE',
  NotTested = 'NOT_TESTED',
}

export enum PatientStatuses {
  Immediate = 'IMMEDIATE',
  Urgent = 'URGENT',
  Normal = 'NORMAL',
}

export enum DonationStatuses {
  PendingAppointment = 'PENDING-APPOINTMENT',
  ConfirmedAppointment = 'CONFIRMED-APPOINTMENT',
  Donated = 'DONATED',
  Accepted = 'ACCEPTED',
  CancelledAppointment = 'CANCELLED-APPOINTMENT',
  Denied = 'DENIED',
  Expired = 'EXPIRED',
  Distributed = 'DISTRIBUTED',
}

export enum BloodRequestStatuses {
  Pending = 'PENDING',
  Fulfilled = 'FULFILLED',
  Cancelled = 'CANCELLED',
}

export enum MessageTypes {
  Confirmed_appointment = 'CONFIRMED_APPOINTMENT',
  Denied_appointment = 'DENIED_APPOINTMENT',
  Confirmed_donation = 'CONFIRMED_DONATION',
  Denied_Donation = 'DENIED_DONATION',
  Donation_call = 'DONATION_CALL',
}

// interfaces Definiations

export interface BaseUser {
  readonly userId: ID;
  readonly userType: UserTypes;
  userName: string;
  userEmail: Email;
  userPassword: Password;
  userCity: Cities;
  userStatus: ActiveStatuses;
}

export interface Donor extends BaseUser {
  dNationalId: NationalID;
  dBloodType: BloodTypes;
  dLastDonation: Date;
}

export interface Hospital {
  readonly hospitalId: ID;
  hospitalName: string;
  hospitalCity: Cities;
  hospitalStatus: ActiveStatuses | ActiveStatuses.Pending;
}

export interface HospitalOfficial extends BaseUser {
  readonly uHospitalId: Hospital['hospitalId'];
}

export interface Bank {
  readonly bankId: ID;
  bankName: string;
  bankCity: Cities;
  bankStatus: ActiveStatuses | ActiveStatuses.Pending;
}

export interface BankOfficial extends BaseUser {
  readonly uBankId: Bank['bankId'];
}

export interface Admin extends BaseUser {}

export interface Donation {
  readonly donationId: ID;
  readonly donorId: Donor['userId'];
  readonly bankId: Bank['bankId'];
  readonly bankCity: Bank['bankCity'];
  bloodType: Donor['dBloodType'];
  virusTest: TestResults | TestResults.NotTested;
  donationStatus: DonationStatuses | DonationStatuses.PendingAppointment;
  aRequestedDate: Date;
  aConfirmedDate: Date;
  donationDate: Date;
  expiryDate: Date;
  lastUpdate: Date;
}

export interface Patient {
  readonly patientId: ID;
  readonly patientNationalId: NationalID;
  patientName: string;
  patient_status: PatientStatuses;
  patientBloodType: BloodTypes;
  patientCity: Cities;
}

export interface BloodRequest extends Patient {
  readonly requestId: ID;
  readonly hId: Hospital['hospitalId'];
  readonly bId: Bank['bankId'];
  pId: Patient['patientId'];
  requestDate: Date;
  requestStatus: BloodRequestStatuses;
}

export interface Notification {
  readonly notificationId: ID;
  userId: BaseUser['userId'];
  senderId: BaseUser['userId'];
  message: string;
  messageType: MessageTypes;
  read: boolean;
  sendAt: Date;
}
export interface BloodStocks extends Donation {
  bId: Donation['bankId'];
  bCity: Donation['bankCity'];
  bloodType: Donation['bloodType'];
  quantity: NonNegativeInteger;
}
