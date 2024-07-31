import { Appointment, BaseUser, Donation, Donor } from '../types';

export interface DonorDao {
  registerDonor(donor: Donor): void;
  loginDonor(
    email: Donor['user_email'],
    password: Donor['user_password']
  ): Donor | null;
  requestAppointment(appointment: Appointment): void;
  getDonationHistoryDonor(donor_id: Donor['user_id']): Donation[];
  getAppointmentHistoryDonor(donor_id: Donor['user_id']): Appointment[];
  getNotifications(donor_id: BaseUser['user_id']): Notification[];
  // To be designed
  updateDonorProfile(
    donor_id: Donor['user_id'],
    updatedInfo: Partial<Donor>
  ): void;
  deleteDonorAccount(donor_id: Donor['user_id']): void;
}
