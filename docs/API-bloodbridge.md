# Central Blood Bank Management System APIs Overview

## Routes

### Donors

**Routes:**

- **Register Donor**
  - **Endpoint:** `/api/donors/register`
  - **HTTP Method:** POST
- **Login Donor**
  - **Endpoint:** `/api/donors/login`
  - **HTTP Method:** POST
- **Request Donation Appointment**
  - **Endpoint:** `/api/donors/appointment`
  - **HTTP Method:** POST
- **View Donation History**
  - **Endpoint:** `/api/donors/history`
  - **HTTP Method:** GET
- **Receive Notifications**
  - **Endpoint:** `/api/donors/notifications`
  - **HTTP Method:** GET

### Hospital Officials

**Routes:**

- **Register Hospital**
  - **Endpoint:** `/api/hospitals/register`
  - **HTTP Method:** POST
- **Login Hospital Official**
  - **Endpoint:** `/api/hospitals/login`
  - **HTTP Method:** POST
- **Search Blood Stock**
  - **Endpoint:** `/api/hospitals/bloodstock`
  - **HTTP Method:** GET
- **Request Blood**
  - **Endpoint:** `/api/hospitals/request`
  - **HTTP Method:** POST
- **View Request History**
  - **Endpoint:** `/api/hospitals/history`
  - **HTTP Method:** GET

### Blood Bank Officials

**Routes:**

- **Confirm Donation Appointment**
  - **Endpoint:** `/api/bloodbanks/appointments/confirm`
  - **HTTP Method:** POST
- **Validate Donation**
  - **Endpoint:** `/api/bloodbanks/donations/validate`
  - **HTTP Method:** POST
- **Add Blood to Stock**
  - **Endpoint:** `/api/bloodbanks/bloodstock`
  - **HTTP Method:** POST
- **Accept Hospital Request**
  - **Endpoint:** `/api/bloodbanks/requests/accept`
  - **HTTP Method:** POST
- **Notify Donors**
  - **Endpoint:** `/api/bloodbanks/donors/notify`
  - **HTTP Method:** POST

### System Admins

**Routes:**

- **Manage Users (Activate/Deactivate)**
  - **Endpoint:** `/api/admins/users/manage`
  - **HTTP Method:** POST

## Example API Routes and HTTP Methods

**Donors:**

```plaintext
POST /api/donors/register
POST /api/donors/login
POST /api/donors/appointment
GET /api/donors/history
GET /api/donors/notifications
```

**Hospital Officials:**

```plaintext
POST /api/hospitals/register
POST /api/hospitals/login
GET /api/hospitals/bloodstock
POST /api/hospitals/request
GET /api/hospitals/history
```

**Blood Bank Officials:**

```plaintext
POST /api/bloodbanks/appointments/confirm
POST /api/bloodbanks/donations/validate
POST /api/bloodbanks/bloodstock
POST /api/bloodbanks/requests/accept
POST /api/bloodbanks/donors/notify
```

**System Admins:**

```plaintext
POST /api/admins/users/manage
```

## MVC Structure

**Models:**

- `Donor`
- `Hospital`
- `BloodBank`
- `Admin`
- `Donation`
- `BloodStock`
- `BloodRequest`

**Controllers:**

- `donorController`
- `hospitalController`
- `bloodBankController`
- `adminController`

**Routes:**

- `donorRoutes`
- `hospitalRoutes`
- `bloodBankRoutes`
- `adminRoutes`

### Folder Structure

```plaintext
project-root/
├── controllers/
│   ├── donorController.js
│   ├── hospitalController.js
│   ├── bloodBankController.js
│   └── adminController.js
├── models/
│   ├── donor.js
│   ├── hospital.js
│   ├── bloodBank.js
│   ├── admin.js
│   ├── donation.js
│   └── bloodStock.js
├── routes/
│   ├── donorRoutes.js
│   ├── hospitalRoutes.js
│   ├── bloodBankRoutes.js
│   └── adminRoutes.js
├── app.js
└── server.js
```
