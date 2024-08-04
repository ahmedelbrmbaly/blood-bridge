# Central Blood Bank Management System ERD

## Entities

## Helper Tables

### cities

- **city_id**: int - serial (PK)
- **city_name**: string (NOT NULL - UNIQUE)

### user_types

- **type_id**: int - serial (PK)
- **user_type**: string(DONOR, HOSPITAL_OFFICIAL, BANK_OFFICIAL, ADMIN) (NOT NULL - UNIQUE)

### active_statuses

- **active_status_id**: int - serial (PK)
- **active_status**: string (ACTIVE, DE-ACTIVE, PENDING, UNKNOWN) (NOT NULL - UNIQUE)

### blood_types

- **blood_type_id**: int - serial (PK)
- **blood_type**: string(a+, a-. b+, b-, ab+, ab-, o+, o-) (NOT NULL - UNIQUE)

### test_results

- **test_result_id**: int - serial (PK)
- **test_result**: string(POSITIVE, NEGATIVE, NOT_TESTED) (NOT NULL - UNIQUE)

### patient_statuses

- **patient_status_id**: int - serial (PK)
- **patient_status**: string(IMMEDIATE, URGENT, NORMAL) (NOT NULL - UNIQUE)

### donation_statuses

- **donation_status_id**: int - serial (PK)
- **donation_status**: string(PENDING APPOINTMENT, CONFIRMED APPOINTMENT,CANCELLED ,DONATED, ACCEPTED, DENIED, EXPIRED, DISTRIBUTED) (NOT NULL - UNIQUE)

### blood_request_statuses

- **blood_request_status_id**: int - serial (PK)
- **blood_request_status**: string(PENDING, FULFILLED, CANCELLED) (NOT NULL - UNIQUE)

### message_types

- **message_type_id**: int - serial (PK)
- **message_type**: string(Confirmed_appointment, Denied_appointment, Confirmed_donation, Denied_Donation, Donation_call) (NOT NULL - UNIQUE)

---

## Main Tables

### base_users

- **user_id**: string (PK)
- **user_type**: Int (FK: user_types.type_id) (NOT NULL)
- **user_name**: string (NOT NULL)
- **user_email**: string (NOT NULL - UNIQUE)
- **user_password**: string(hashed) (NOT NULL)
- **user_city**: Int (FK: cities.city_id) (NOT NULL)
- **user_status**: Int (FK: active_statuses.active_status_id ) (NOT NULL) (DEFAULT: PENDING)

### donors

- **donor_id**: FK (base_users.user_id)
- **national_id**: string (NOT NULL)
- **blood_type**: FK (blood_types.blood_types_id) (NOT NULL)
- **last_donation**: date

### hospitals

- **hospital_id**: PK
- **hospital_name**: string (NOT NULL)
- **hospital_city**: Int (FK: cities.city_id) (NOT NULL)
- **hospital_status**: Int (FK: active_statuses.active_status_id ) (NOT NULL) (DEFAULT: PENDING)

### hospital_Officials

- **hospital_user_id**: FK (base_users.user_id) (NOT NULL)
- **hospital_id**: FK (hospitals.hospital_id) (NOT NULL)

### banks

- **bank_id**: PK
- **bank_name**: string (NOT NULL)
- **bank_city**: Int (FK: cities.city_id) (NOT NULL)
- **bank_status**: Int (FK: active_statuses.active_status_id ) (NOT NULL) (DEFAULT: PENDING)

### bank_Officials

- **bank_user_id**: FK (base_users.user_id) (NOT NULL)
- **bank_id**: FK (banks.bank_id) (NOT NULL)

### donations

- **donation_id**: PK
- **donor_id**: FK (base_users.user_id) (NOT NULL)
- **bank_id**: FK (banks.bank_id) (NOT NULL)
- **blood_type**: FK (donors.blood_type) (NOT NULL)
- **virus_test**: FK (test_results.test_result_id) (NOT NULL) (DEFAULT: NOT TESTED)
- **donation_status**: FK (donation_statuses) (NOT NULL) (DEFAULT: PENDING)
- **appointment_requested_at**: Date
- **appointment_confirmed_date**: Date
- **donation_date**: date
- **expiration_date**: date (after 42 days)
- **last_update**: date

### patients

- **patient_id**: string (PK)
- **patient_name**: string (NOT NULL)
- **national_id**: string (NOT NULL)
- **blood_type**: FK (blood_types.blood_types_id) (NOT NULL)
- **patient_city**: Int (FK: cities.city_id) (NOT NULL)
- **patient_status**: Int (FK: patient_statuses.patient_status ) (NOT NULL) (DEFAULT: NORMAL)

### blood_requests

- **request_id**: PK
- **hospital_id**: FK (hospitals.hospital_id) (NOT NULL)
- **bank_id**: FK (banks.bank_id) (NOT NULL)
- **patient_id**: FK (patients.patient_id) (NOT NULL)
- **requested_date**: date
- **status**: Int FK(blood_request_statuses.blood_request_status) (NOT NULL) (DEFAULT: PENDING)

### notifications

- **notification_id**: PK
- **user_id**: FK (base_users.user_id) (NOT NULL)
- **sender_id**: FK (base_users.user_id)
- **message**: string
- **message_type**: FK (message_types.message_type_id) (NOT NULL)
- **read**: boolean
- **send_at**: date

---

## VIEWS

### blood_stocks: View not a table (where donation_status is ACCEPTED)

- **bank_id**: FK (donations.bank_id) (NOT NULL)
- **bank_city**: Int (FK: banks.bank_city) (NOT NULL)
- **blood_type**: FK FK (donations.blood_type) (NOT NULL)
- **quantity**: COUNT()

---

## Relationships

- **Donor** makes **Donation**
- **Donation** added to **BloodStock**
- **Hospital Official** makes **Blood Request**
- **Blood Bank** receives **Donation**
- **Blood Bank** manages **Blood Stock**
- **Blood Bank** fulfills **Blood Request**
- **Admin** manages **Blood Bank**
- **Admin** manages **Hospital**
- **Admin** manages **All Users**
