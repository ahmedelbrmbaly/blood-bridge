------------------------------------------------------------------
-- Up
------------------------------------------------------------------

-- Insert data into cities table
INSERT INTO cities (city_name) VALUES 
('Cairo'), ('Alexandria'), ('Gizeh'), ('Shubra El-Kheima'), ('Port Said'), 
('Suez'), ('Luxor'), ('Mansura'), ('El-Mahalla El-Kubra'), ('Tanta'), 
('Asyut'), ('Ismailia'), ('Fayyum'), ('Zagazig'), ('Aswan'), 
('Damietta'), ('Damanhur'), ('Minya'), ('Beni Suef'), ('Qena'), 
('Sohag'), ('Hurghada'), ('6th of October City'), ('Shibin El Kom'), 
('Banha'), ('Kafr el-Sheikh'), ('Arish'), ('Mallawi'), 
('10th of Ramadan City'), ('Bilbais'), ('Marsa Matruh'), ('Idfu'), 
('Mit Ghamr'), ('Al-Hamidiyya'), ('Desouk'), ('Qalyub'), ('Abu Kabir'), 
('Kafr el-Dawwar'), ('Girga'), ('Akhmim'), ('Matareya');

-- Insert data into entities_types table
INSERT INTO entities_types (user_type) VALUES 
('DONOR'), ('HOSPITALOFFICIAL'), ('BANKOFFICIAL'), ('ADMIN'), ('Bank'), ('Hospital');

-- Insert data into active_statuses table
INSERT INTO active_statuses (active_status) VALUES 
('ACTIVE'), ('DE-ACTIVE'), ('PENDING'), ('UNKNOWN');

-- Insert data into blood_types table
INSERT INTO blood_types (blood_type) VALUES 
('a+'), ('a-'), ('b+'), ('b-'), ('ab+'), ('ab-'), ('o+'), ('o-');

-- Insert data into test_results table
INSERT INTO test_results (test_result) VALUES 
('POSITIVE'), ('NEGATIVE'), ('NOTTESTED');

-- Insert data into patient_statuses table
INSERT INTO patient_statuses (patient_status) VALUES 
('IMMEDIATE'), ('URGENT'), ('NORMAL');

-- Insert data into donation_statuses table
INSERT INTO donation_statuses (donation_status) VALUES 
('PENDING-APPOINTMENT'), ('CONFIRMED-APPOINTMENT'), ('DONATED'), ('ACCEPTED'), 
('CANCELLED-APPOINTMENT'), ('DENIED'), ('EXPIRED'), ('DISTRIBUTED');

-- Insert data into blood_request_statuses table
INSERT INTO blood_request_statuses (blood_request_status) VALUES 
('PENDING'), ('FULFILLED'), ('CANCELLED');

-- Insert data into message_types table
INSERT INTO message_types (message_type) VALUES 
('CONFIRMED_APPOINTMENT'), ('DENIED_APPOINTMENT'), ('CONFIRMED_DONATION'), 
('DENIED_DONATION'), ('DONATION_CALL');