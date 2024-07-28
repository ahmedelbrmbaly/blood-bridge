# Central Blood Bank Management System ERD

## Entities

### Donor

- **donor_id**: PK
- **national_id**: string
- **name**: string
- **email**: string
- **password**: string
- **city**: string
- **blood_group**: string
- **last_donation**: date

### Hospital

- **hospital_user_id**: PK
- **user_name**: string
- **hospital_name**: string
- **email**: string
- **password**: string
- **city**: string

### Bank

- **bank_user_id**: PK
- **user_name**: string
- **bank_name**: string
- **email**: string
- **password**: string
- **city**: string

### Admin

- **admin_id**: PK
- **user_name**: string
- **email**: string
- **password**: string

### Donation

- **donation_id**: PK
- **donor_id**: FK
- **blood_bank_id**: FK
- **donation_date**: date
- **virus_free**: boolean

### Blood Stock

- **blood_stock_id**: PK
- **blood_group**: string
- **blood_bank_id**: FK
- **expiration_date**: date
- **quantity**: integer

### Blood Request

- **request_id**: PK
- **hospital_id**: FK
- **blood_group**: string
- **status**: string
- **request_date**: date
- **patient_name**: string
- **blood_bank_id**: FK

## Relationships

- **Donor** makes **Donation**
- **Donation** added to **BloodStock**
- **Hospital** makes **BloodRequest**
- **BloodBank** receives **Donation**
- **BloodBank** manages **BloodStock**
- **BloodBank** fulfills **BloodRequest**
- **Admin** manages **BloodBank**
- **Admin** manages **Hospital**
