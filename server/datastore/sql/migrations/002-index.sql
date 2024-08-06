------------------------------------------------------------------
-- Up
------------------------------------------------------------------

-- Indexes for base_users table
CREATE INDEX idx_base_users_email ON base_users(user_email);
CREATE INDEX idx_base_users_type ON base_users(user_type);
CREATE INDEX idx_base_users_city ON base_users(user_city);

-- Indexes for donors table
CREATE INDEX idx_donors_national_id ON donors(national_id);
CREATE INDEX idx_donors_blood_type ON donors(blood_type);

-- Indexes for banks table
CREATE INDEX idx_banks_city ON banks(bank_city);

-- Indexes for donations table
CREATE INDEX idx_donations_blood_type ON donations(blood_type);
CREATE INDEX idx_donations_virus_test ON donations(virus_test);
CREATE INDEX idx_donations_status ON donations(donation_status);

-- Indexes for patients table
CREATE INDEX idx_patients_national_id ON patients(national_id);
CREATE INDEX idx_patients_blood_type ON patients(blood_type);
CREATE INDEX idx_patients_status ON patients(patient_status);
CREATE INDEX idx_patients_city ON patients(patient_city);
