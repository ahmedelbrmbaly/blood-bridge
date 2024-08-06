------------------------------------------------------------------
-- Up
------------------------------------------------------------------

-- Helper Tables
CREATE TABLE cities (
    city_id INTEGER PRIMARY KEY AUTOINCREMENT,
    city_name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE entities_types (
    type_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_type VARCHAR NOT NULL UNIQUE CHECK(user_type IN ('DONOR', 'HOSPITALOFFICIAL', 'BANKOFFICIAL', 'ADMIN', 'Bank', 'Hospital'))
);

CREATE TABLE active_statuses (
    active_status_id INTEGER PRIMARY KEY AUTOINCREMENT,
    active_status VARCHAR NOT NULL UNIQUE CHECK(active_status IN ('ACTIVE', 'DE-ACTIVE', 'PENDING', 'UNKNOWN'))
);

CREATE TABLE blood_types (
    blood_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
    blood_type VARCHAR NOT NULL UNIQUE CHECK(blood_type IN ('a+', 'a-', 'b+', 'b-', 'ab+', 'ab-', 'o+', 'o-'))
);

CREATE TABLE test_results (
    test_result_id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_result VARCHAR NOT NULL UNIQUE CHECK(test_result IN ('POSITIVE', 'NEGATIVE', 'NOTTESTED'))
);

CREATE TABLE patient_statuses (
    patient_status_id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_status VARCHAR NOT NULL UNIQUE CHECK(patient_status IN ('IMMEDIATE', 'URGENT', 'NORMAL'))
);

CREATE TABLE donation_statuses (
    donation_status_id INTEGER PRIMARY KEY AUTOINCREMENT,
    donation_status VARCHAR NOT NULL UNIQUE CHECK(donation_status IN ('PENDING-APPOINTMENT', 'CONFIRMED-APPOINTMENT', 'DONATED', 'ACCEPTED', 'CANCELLED-APPOINTMENT', 'DENIED', 'EXPIRED', 'DISTRIBUTED'))
);

CREATE TABLE blood_request_statuses (
    blood_request_status_id INTEGER PRIMARY KEY AUTOINCREMENT,
    blood_request_status VARCHAR NOT NULL UNIQUE CHECK(blood_request_status IN ('PENDING', 'FULFILLED', 'CANCELLED'))
);

CREATE TABLE message_types (
    message_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
    message_type VARCHAR NOT NULL UNIQUE CHECK(message_type IN ('CONFIRMED_APPOINTMENT', 'DENIED_APPOINTMENT', 'CONFIRMED_DONATION', 'DENIED_DONATION', 'DONATION_CALL'))
);

------------------
-- Main Tables
CREATE TABLE base_users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_type INTEGER NOT NULL,
    user_name VARCHAR NOT NULL,
    user_email VARCHAR NOT NULL UNIQUE CHECK(user_email LIKE '%@%'),
    user_password VARCHAR NOT NULL,
    user_city INTEGER NOT NULL,
    user_status INTEGER NOT NULL,
    FOREIGN KEY (user_type) REFERENCES entities_types(type_id),
    FOREIGN KEY (user_city) REFERENCES cities(city_id),
    FOREIGN KEY (user_status) REFERENCES active_statuses(active_status_id)
);

CREATE TABLE donors (
    donor_id INTEGER PRIMARY KEY,
    national_id VARCHAR NOT NULL UNIQUE,
    blood_type INTEGER NOT NULL,
    last_donation DATE,
    FOREIGN KEY (donor_id) REFERENCES base_users(user_id),
    FOREIGN KEY (blood_type) REFERENCES blood_types(blood_type_id)
);

CREATE TABLE hospitals (
    hospital_id INTEGER PRIMARY KEY AUTOINCREMENT,
    hospital_name VARCHAR NOT NULL,
    hospital_city INTEGER NOT NULL,
    hospital_status INTEGER NOT NULL ,
    FOREIGN KEY (hospital_city) REFERENCES cities(city_id),
    FOREIGN KEY (hospital_status) REFERENCES active_statuses(active_status_id)
);

CREATE TABLE hospital_officials (
    hospital_user_id INTEGER PRIMARY KEY,
    hospital_id INTEGER NOT NULL,
    FOREIGN KEY (hospital_user_id) REFERENCES base_users(user_id),
    FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id)
);

CREATE TABLE banks (
    bank_id INTEGER PRIMARY KEY AUTOINCREMENT,
    bank_name VARCHAR NOT NULL,
    bank_city INTEGER NOT NULL,
    bank_status INTEGER NOT NULL ,
    FOREIGN KEY (bank_city) REFERENCES cities(city_id),
    FOREIGN KEY (bank_status) REFERENCES active_statuses(active_status_id)
);

CREATE TABLE bank_officials (
    bank_user_id INTEGER PRIMARY KEY,
    bank_id INTEGER NOT NULL,
    FOREIGN KEY (bank_user_id) REFERENCES base_users(user_id),
    FOREIGN KEY (bank_id) REFERENCES banks(bank_id)
);

CREATE TABLE donations (
    donation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    donor_id INTEGER NOT NULL,
    bank_id INTEGER NOT NULL,
    blood_type INTEGER NOT NULL,
    virus_test INTEGER NOT NULL ,
    donation_status INTEGER NOT NULL,
    appointment_requested_at DATE DEFAULT CURRENT_DATE,
    appointment_confirmed_date DATE,
    donation_date DATE,
    expiration_date DATE,
    last_update DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (donor_id) REFERENCES base_users(user_id),
    FOREIGN KEY (bank_id) REFERENCES banks(bank_id),
    FOREIGN KEY (blood_type) REFERENCES blood_types(blood_type_id),
    FOREIGN KEY (virus_test) REFERENCES test_results(test_result_id),
    FOREIGN KEY (donation_status) REFERENCES donation_statuses(donation_status_id)
);

CREATE TABLE patients (
    patient_id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_name VARCHAR NOT NULL,
    national_id VARCHAR NOT NULL UNIQUE,
    blood_type INTEGER NOT NULL,
    patient_city INTEGER NOT NULL,
    patient_status INTEGER NOT NULL,
    FOREIGN KEY (blood_type) REFERENCES blood_types(blood_type_id),
    FOREIGN KEY (patient_city) REFERENCES cities(city_id),
    FOREIGN KEY (patient_status) REFERENCES patient_statuses(patient_status_id)
);

CREATE TABLE blood_requests (
    request_id INTEGER PRIMARY KEY AUTOINCREMENT,
    hospital_id INTEGER NOT NULL,
    bank_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    requested_date DATE DEFAULT CURRENT_DATE,
    request_status INTEGER NOT NULL,
    FOREIGN KEY (hospital_id) REFERENCES hospitals(hospital_id),
    FOREIGN KEY (bank_id) REFERENCES banks(bank_id),
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (request_status) REFERENCES blood_request_statuses(blood_request_status_id)
);

CREATE TABLE notifications (
    notification_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    sender_id INTEGER,
    n_message VARCHAR,
    message_type INTEGER NOT NULL,
    is_read BOOLEAN,
    send_at DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES base_users(user_id),
    FOREIGN KEY (sender_id) REFERENCES base_users(user_id),
    FOREIGN KEY (message_type) REFERENCES message_types(message_type_id)
);

 ------------------------------------------------------------------
-- View
CREATE VIEW blood_stocks AS
SELECT 
    donations.bank_id,
    banks.bank_city,
    donations.blood_type,
    COUNT(*) AS quantity
FROM donations
JOIN banks ON donations.bank_id = banks.bank_id
WHERE donations.donation_status = (SELECT donation_status_id FROM donation_statuses WHERE donation_status = 'ACCEPTED' AND virus_test = (SELECT test_result_id FROM test_results WHERE test_result = 'NEGATIVE'))
AND donations.expiration_date > DATE('now')
GROUP BY donations.bank_id, banks.bank_city, donations.blood_type;