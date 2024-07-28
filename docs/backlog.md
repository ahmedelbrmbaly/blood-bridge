# Product Backlog with Acceptance Criteria

1. **User Authentication**

   - **As a user, I want to register with my email and password.**

     - **Acceptance Criteria:**
       - Users can create an account by providing their email and password.
       - An error message is shown if the email is already registered.
       - A confirmation email is sent to verify the email address.

   - **As a user, I want to log in using my email and password.**

     - **Acceptance Criteria:**
       - Users can log in using their registered email and password.
       - An error message is shown for incorrect email or password.
       - Successful login redirects the user to their dashboard.

   - **As a donor, I want to register using my Google account.**
     - **Acceptance Criteria:**
       - Users can sign up and log in using their Google account.
       - Google account information is used to pre-fill registration details.
       - Successful login redirects the user to their dashboard.

2. **Donor Management**

   - **As a donor, I want to register with my personal information.**

     - **Acceptance Criteria:**
       - Donors can register by providing National ID, Name, City, Email, Password, Blood Group, and Last Donation Date.
       - Validation ensures all required fields are filled.
       - An error message is shown if any required information is missing or invalid.

   - **As a donor, I want to request an appointment to donate blood.**

     - **Acceptance Criteria:**
       - Donors can request an appointment by selecting a date and blood bank.
       - Appointments can be requested only if the last donation date is more than 3 months ago.
       - Confirmation of appointment request is shown.

   - **As a donor, I want to view my donation history.**

     - **Acceptance Criteria:**
       - Donors can view a list of their past donations with dates and statuses.
       - Donation history is accurate and up-to-date.

   - **As a donor, I want to receive emails about the acceptance or rejection of my donation.**

     - **Acceptance Criteria:**
       - Donors receive an email notification when their donation is accepted or rejected.
       - The email contains details and reasons for rejection if applicable.

   - **As a donor, I want to be notified if there's a hospital need for my blood type.**
     - **Acceptance Criteria:**
       - Donors receive notifications if their blood type is needed by a hospital.
       - Notification includes details about the request and eligibility for donation.

3. **Hospital Management**

   - **As a hospital official, I want to register my hospital.**

     - **Acceptance Criteria:**
       - Hospital officials can register by providing hospital name, city, email, and password.
       - Validation ensures all required fields are filled.
       - An error message is shown if any required information is missing or invalid.

   - **As a hospital official, I want to log in using my email and password.**

     - **Acceptance Criteria:**
       - Hospital officials can log in using their registered email and password.
       - An error message is shown for incorrect email or password.
       - Successful login redirects the user to their dashboard.

   - **As a hospital official, I want to search for available blood stocks.**

     - **Acceptance Criteria:**
       - Hospital officials can search blood stocks by blood group and location.
       - Search results display available blood units and their expiration dates.

   - **As a hospital official, I want to request blood for a patient.**

     - **Acceptance Criteria:**
       - Hospital officials can request blood by providing patient name, blood group, status, and city of blood bank.
       - Validation ensures all required fields are filled.
       - Confirmation of blood request is shown.

   - **As a hospital official, I want to view the history of requested blood.**
     - **Acceptance Criteria:**
       - Hospital officials can view a list of their past blood requests with dates and statuses.
       - Request history is accurate and up-to-date.

4. **Blood Bank Management**

   - **As a blood bank official, I want to confirm donor appointments.**

     - **Acceptance Criteria:**
       - Blood bank officials can view and confirm donor appointments.
       - Confirmation changes the status of the appointment to confirmed.

   - **As a blood bank official, I want to validate a donation.**

     - **Acceptance Criteria:**
       - Blood bank officials can mark donations as virus-free or not.
       - Valid donations are added to the blood stock.

   - **As a blood bank official, I want to add valid donations to the blood stock.**

     - **Acceptance Criteria:**
       - Valid donations are added to the blood stock with blood group, blood bank city, and expiration date.
       - Stock levels are updated accurately.

   - **As a blood bank official, I want to accept hospital requests for blood.**

     - **Acceptance Criteria:**
       - Blood bank officials can accept hospital requests if blood is available.
       - Accepted requests are marked as fulfilled and stock levels are updated.

   - **As a blood bank official, I want to notify donors if their blood type is needed.**
     - **Acceptance Criteria:**
       - Blood bank officials can notify eligible donors if their blood type is needed by a hospital.
       - Notification includes details about the request and eligibility for donation.

5. **Admin Management**

   - **As a system admin, I want to manage user accounts.**
     - **Acceptance Criteria:**
       - Admins can activate or deactivate user accounts for hospitals and blood bank officials.
       - User account statuses are updated accurately and users are notified.

6. **Notification System**

   - **As a system, I want to send email notifications to donors.**

     - **Acceptance Criteria:**
       - Donors receive email notifications about donation acceptance or rejection.
       - Emails contain detailed information about the donation status.

   - **As a system, I want to notify donors if their blood type is needed.**
     - **Acceptance Criteria:**
       - Donors receive notifications if their blood type is needed by a hospital.
       - Notifications include request details and eligibility for donation.

7. **Blood Stock Management**

   - **As a system, I want to keep track of blood stocks in different blood banks.**

     - **Acceptance Criteria:**
       - Blood stocks are tracked accurately by blood group, location, and expiration date.
       - Stock levels are updated in real-time with donations and requests.

   - **As a system, I want to manage the expiration dates of blood stocks.**

     - **Acceptance Criteria:**
       - Expiration dates for blood stocks are tracked and managed.
       - Notifications are sent for approaching expiration dates to ensure timely usage.

   - **As a system, I want to fulfill hospital blood requests.**
     - **Acceptance Criteria:**
       - Hospital blood requests are fulfilled based on availability and location.
       - Stock levels are updated accurately and requests are marked as fulfilled.

8. **Reporting and Analytics**

   - **As a system admin, I want to generate reports on donation statistics.**

     - **Acceptance Criteria:**
       - Reports on donation statistics are generated accurately.
       - Reports include total donations, valid donations, and donor demographics.

   - **As a system admin, I want to generate reports on blood stock levels and usage.**

     - **Acceptance Criteria:**
       - Reports on blood stock levels and usage are generated accurately.
       - Reports include current stock levels, expiration dates, and usage rates.

   - **As a system admin, I want to generate reports on hospital blood requests and fulfillment rates.**
     - **Acceptance Criteria:**
       - Reports on hospital blood requests and fulfillment rates are generated accurately.
       - Reports include total requests, fulfilled requests, and fulfillment rates by location and blood group.

### Sprint Planning

#### Sprint 1

- **User Authentication**

  - Register with email and password (Acceptance Criteria Met)
  - Log in using email and password (Acceptance Criteria Met)
  - Register using Google account (Acceptance Criteria Met)

- **Donor Management**
  - Register with personal information (Acceptance Criteria Met)
  - Request an appointment to donate blood (Acceptance Criteria Met)
  - View donation history (Acceptance Criteria Met)

#### Sprint 2

- **Hospital Management**

  - Register hospital (Acceptance Criteria Met)
  - Log in using email and password (Acceptance Criteria Met)
  - Search for available blood stocks (Acceptance Criteria Met)
  - Request blood for a patient (Acceptance Criteria Met)
  - View the history of requested blood (Acceptance Criteria Met)

- **Blood Bank Management**
  - Confirm donor appointments (Acceptance Criteria Met)
  - Validate a donation (Acceptance Criteria Met)
  - Add valid donations to the blood stock (Acceptance Criteria Met)

#### Sprint 3

- **Notification System**

  - Send email notifications to donors (Acceptance Criteria Met)
  - Notify donors if their blood type is needed (Acceptance Criteria Met)

- **Admin Management**
  - Manage user accounts (Acceptance Criteria Met)

#### Sprint 4

- **Blood Stock Management**
  - Track blood stocks (Acceptance Criteria Met)
  - Manage expiration dates (Acceptance Criteria Met)
  - Fulfill hospital blood requests (Acceptance Criteria Met)

#### Sprint 5

- **Reporting and Analytics**
  - Generate reports on donation statistics (Acceptance Criteria Met)
  - Generate reports on blood stock levels and usage (Acceptance Criteria Met)
  - Generate reports on hospital blood requests and fulfillment rates (Acceptance Criteria Met)

This backlog with acceptance criteria and sprint planning ensures a well-organized and systematic development process, focusing on delivering essential features and functionalities efficiently.
