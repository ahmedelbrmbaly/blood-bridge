# Central Blood Bank Management System APIs Overview

## Routes

### Users

**Routes:**

- **home**

  - **Endpoint:** `/v1/home`
  - **HTTP Method:** GET

- **Login**

  - **Endpoint:** `/v1/login`
  - **HTTP Method:** POST

- **Logout**

  - **Endpoint:** `/v1/logout`
  - **HTTP Method:** POST

  ***

### Donors

**Routes:**

- **Register Donor**
  - **Endpoint:** `/v1/donors/register`
  - **HTTP Method:** POST
- **Request Donation**
  - **Endpoint:** `/v1/donors/request-donation`
  - **HTTP Method:** POST
- **OPTIONAL: View Donation History**
  - **Endpoint:** `/v1/donors/history`
  - **HTTP Method:** GET
- **OPTIONAL: Receive Notifications**
  - **Endpoint:** `/v1/donors/notifications`
  - **HTTP Method:** GET

### Hospital Officials

**Routes:**

- **Register Hospital Official**
  - **Endpoint:** `/v1/hospital-user/register`
  - **HTTP Method:** POST
- **Search Blood Stock**
  - **Endpoint:** `/v1/hospital-user/search-stock`
  - **HTTP Method:** GET
- **Request Blood**
  - **Endpoint:** `/v1/hospital-user/request-blood`
  - **HTTP Method:** POST
- **OPTIONAL: View Request History**
  - **Endpoint:** `/v1/hospital-user/history`
  - **HTTP Method:** GET

### Blood Bank Officials

**Routes:**

- **Register Bank Official**
  - **Endpoint:** `/v1/bank-user/register`
  - **HTTP Method:** POST
- **Confirm Donation Appointment**
  - **Endpoint:** `/v1/bank-user/appointments/confirm`
  - **HTTP Method:** POST
- **Validate Donation**
  - **Endpoint:** `/v1/bank-user/donations/change-status`
  - **HTTP Method:** POST
- **Add Blood to Stock**
  - **Endpoint:** `/v1/bank-user/add-stocks`
  - **HTTP Method:** POST
- **Accept Hospital Request**
  - **Endpoint:** `/v1/bank-user/requests/accept`
  - **HTTP Method:** POST
- **Notify Donors**
  - **Endpoint:** `/v1/bank-user/donors/notify`
  - **HTTP Method:** POST

### System Admins

**Routes:**

- **Register Hospital**
  - **Endpoint:** `/v1/hospital/register`
  - **HTTP Method:** POST
- **Register Bank**
  - **Endpoint:** `/v1/bank/register`
  - **HTTP Method:** POST
- **Manage Users (Activate/Deactivate)**
  - **Endpoint:** `/v1/admin/users/manage`
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
