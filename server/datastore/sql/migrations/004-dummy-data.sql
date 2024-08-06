-- Insert data into base_users table
INSERT INTO base_users (user_type, user_name, user_email, user_password, user_city, user_status) VALUES 
(1, 'Donor1 full name', 'd1@d.com', '123', 1, 1), -- DONOR
(1, 'Donor1 full name', 'd2@d.com', '345', 2, 1), -- DONOR
(3, 'bank user1', 'b1@b.com', '123', 1, 1), -- BANK OFFICIAL
(3, 'bank user2', 'b2@b.com', '123', 2, 1), -- BANK OFFICIAL
(4, 'admin', 'a1@a.com', '123', 1, 1), -- ADMIN
(2, 'hospital user1', 'h1@h.com', '123', 1, 1), -- Hospital Official
(2, 'hospital user2', 'h2@h.com', '123', 2, 1); -- Hospital Official


-- Insert data into donors table
INSERT INTO donors (donor_id, national_id, blood_type, last_donation) VALUES 
(1, '12345678901234', 1, '2023-01-01'), 
(2, '23456789012345', 2, '2023-02-01');

-- Insert data into hospitals table
INSERT INTO hospitals (hospital_name, hospital_city, hospital_status) VALUES 
('General Hospital1', 1, 1),
('General Hospital2', 2, 1);

-- Insert data into hospital_officials table
INSERT INTO hospital_officials (hospital_user_id, hospital_id) VALUES 
(6, 1),
(7, 2);

-- Insert data into banks table
INSERT INTO banks (bank_name, bank_city, bank_status) VALUES 
('Central Blood Bank1', 1, 1),
('Central Blood Bank2', 2, 1);

-- Insert data into bank_officials table
INSERT INTO bank_officials (bank_user_id, bank_id) VALUES 
(3, 1),
(4, 2);


-- Insert data into patients table
INSERT INTO patients (patient_name, national_id, blood_type, patient_city, patient_status) VALUES 
('David Green', '34567890123456', 1, 1, 1),
('Eva White', '45678901234567', 2, 2, 2),
('Frank Black', '56789012345678', 5, 3, 3);

-- Insert data into blood_requests table
INSERT INTO blood_requests (hospital_id, bank_id, patient_id, request_status) VALUES 
(1, 1, 1, 1),
(1, 1, 2, 2),
(1, 1, 3, 3);

-- Insert data into notifications table
INSERT INTO notifications (user_id, sender_id, n_message, message_type, is_read) VALUES 
(1, 2, 'Your donation appointment is confirmed.', 1, 0),
(2, 3, 'Your donation was denied.', 2, 0),
(1, 4, 'Your donation is confirmed.', 3, 1),
(2, 5, 'Your donation was denied.', 4, 1),
(1, 1, 'Please donate blood.', 5, 0);