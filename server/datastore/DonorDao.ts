import { Appointment, Donation, Donor } from '../types';

export interface DonorDao {
  register_donor(donor: Donor): void;
  login_donor(
    email: Donor['user']['email'],
    password: Donor['user']['password']
  ): void;
  request_appointment(appointment: Appointment): void;
  donation_history(donor_id: Donor['user']['user_id']): Donation[];
  appointment_history(donor_id: Donor['user']['user_id']): Appointment[];
  notifications(donor_id: Donor['user']['user_id']): void; // To be designed
}
