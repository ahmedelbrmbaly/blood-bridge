import { Appointment, Donation, Donor } from '../types';

export interface DonorDao {
  registerDonor(donor: Donor): void;
  loginDonor(email: Donor['email'], password: Donor['password']): Donor | null;
  requestAppointment(appointment: Appointment): void;
  getDonationHistory(donor_id: Donor['user_id']): Donation[];
  getAppointmentHistory(donor_id: Donor['user_id']): Appointment[];
  getNotifications(donorId: string): Notification[];
  // To be designed
  updateProfile(donor_id: Donor['user_id'], updatedInfo: Partial<Donor>): void;
  deleteAccount(donor_id: Donor['user_id']): void;
}
