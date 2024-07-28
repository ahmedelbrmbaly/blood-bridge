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

- **hospital_id**: PK
- **name**: string
- **email**: string
- **password**: string
- **city**: string

### Blood Bank

- **blood_bank_id**: PK
- **city**: string

### Admin

- **admin_id**: PK
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
