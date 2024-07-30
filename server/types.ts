export interface User {
  user_id: string;
  user_type: string;
  national_id: string;
  name: string;
  email: string;
  password: string;
  city: string;
}

export interface Blood {
  type: string;
  virus_test: string;
  expiration: Date;
}

export interface Donor {
  user: User;
  national_id: string;
  blood_info: Blood;
  last_donation: Date;
}

export interface Hospital {
  hospital_id: string;
  hospital_name: string;
  city: string;
}

export interface HospitalOfficial {
  user: User;
  hospital_id: string;
}

export interface Bank {
  bank_id: string;
  bank_name: string;
  city: string;
}

export interface BankOfficial {
  user: User;
  bank_id: string;
}

export interface Admin {
  user: User;
}

export interface Donation {
  donation_id: string;
  user_id: User['user_id'];
  bank_id: Bank['bank_id'];
  blood_info: Donor['blood_info'];
}

export interface Blood_stocks {}
