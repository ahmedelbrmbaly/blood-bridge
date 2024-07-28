# Product Requirements Document (PRD)

## Project Overview

A Central Blood Bank Management System (CBMS) aims to streamline the process of blood donation, management, and distribution.

The system will cater to four primary user roles: Donors, Hospital Officials, Blood Bank Officials, and System Admins.

The platform will ensure efficient handling of blood donations, requests, and stock management.

## Users and User Stories

**1. Donors**

**User Stories:**

- As a donor, I want to log in to the website with my email and password or through Google, so I can access my account easily.
- As a donor, I want to register by providing my national ID, name, city, email, password, blood group, and last donation date, so I can become a registered donor.
- As a donor, I want to request an appointment to donate blood to the blood bank, so I can schedule my donations conveniently.
- As a donor, I want to view my donation history, so I can keep track of my past donations.
- As a donor, I want to receive emails about the acceptance or rejection of my donations, so I can stay informed.
- As a donor, I want to get notified if there is a hospital need for my blood type and I am eligible to donate, so I can help in emergencies.

**2. Hospital Officials**

**User Stories:**

- As a hospital official, I want to log in with my email and password, so I can access my account securely.
- As a hospital official, I want to sign up with my email, password, hospital name, and hospital city, so I can register my hospital in the system.
- As a hospital official, I want to search for available blood stocks and request blood, confirming patient name, blood group, status, and the city of the blood bank, so I can fulfill the hospital's blood requirements.
- As a hospital official, I want to request a new donation if a blood type is not available, so I can ensure the availability of necessary blood types.
- As a hospital official, I want to see the history of requested blood, so I can track past requests.

**3. Blood Bank Officials**

**User Stories:**

- As a blood bank official, I want to confirm donor appointments, so I can manage the donation schedule.
- As a blood bank official, I want to confirm if the donated blood is virus-free and add it to stocks, so I can ensure the safety and availability of blood.
- As a blood bank official, I want to accept hospital requests, so I can distribute blood efficiently.
- As a blood bank official, I want to notify donors if they are eligible to donate and if a hospital needs their blood type, so I can encourage timely donations.

**4. System Admins**

**User Stories:**

- As a system admin, I want to activate or deactivate hospital and blood bank officials' access and privileges, so I can manage user roles and ensure system security.

## Functional Requirements

**Donor Management:**

- User authentication (login with email/password or Google).
- Registration form with personal details.
- Appointment scheduling.
- Donation history display.
- Email notifications for donation status.
- Blood donation eligibility notifications.

**Hospital Management:**

- User authentication (email/password).
- Registration form with hospital details.
- Blood stock search and request functionality.
- New donation request capability.
- Request history display.

**Blood Bank Management:**

- Appointment confirmation.
- Blood virus test results management.
- Blood stock update and management.
- Hospital request acceptance.
- Donor notification for blood requests.

**Admin Management:**

- User role management (activation/deactivation of access).
- Privilege management for hospital and blood bank officials.

## Non-Functional Requirements

**Performance:**

- The system should handle at least 10 concurrent requests.

**Usability:**

- User-friendly interface for all user roles.
- Clear navigation.

**Reliability:**

- Accurate and consistent data handling.

**Security:**

- Secure authentication and authorization mechanisms.
- Data encryption for sensitive information.

**Maintainability:**

- Code should follow best practices for readability and organization (MVC recommended).
- Comprehensive documentation for developers and users.

## Technical Stack

**Backend:**

- Framework: Express (NodeJS)
- Database: PostgreSQL

**Frontend:**

- HTML, CSS, Bootstrap

**Hosting:**

- AWS, Azure, or any reliable cloud platform

**Version Control:**

- Git (GitHub, GitLab, or Bitbucket)

## Milestones and Sprints

**Sprint 0: Project Setup and Planning**

- Duration: 1 week
- Goals: Environment setup, scope definition, sprint planning
- Deliverables: Project charter, sprint schedule, product backlog

**Sprint 1: User Registration and Authentication**

- Duration: 2 weeks
- Goals: Implement user registration and authentication
- Deliverables: Registration and login functionality, database schema, unit tests

**Sprint 2: Donation Submission and Validation**

- Duration: 2 weeks
- Goals: Implement donation submission and validation
- Deliverables: Donation submission endpoints, validation logic, email notifications

**Sprint 3: Blood Stock Management**

- Duration: 2 weeks
- Goals: Implement blood stock management
- Deliverables: Blood stock endpoints, management UI, integration tests

**Sprint 4: Hospital Requests and Matching**

- Duration: 2 weeks
- Goals: Implement hospital blood requests and matching
- Deliverables: Request endpoints, matching logic, request management UI

**Sprint 5: Optimization and Performance Tuning**

- Duration: 2 weeks
- Goals: Optimize for handling concurrent requests, perform load testing
- Deliverables: Performance-optimized endpoints, load testing results, tuning documentation

**Sprint 6: Reporting and Analytics**

- Duration: 2 weeks
- Goals: Implement reporting and analytics features
- Deliverables: Reporting endpoints, admin dashboard, integration tests

**Sprint 7: Final Testing and Deployment**

- Duration: 2 weeks
- Goals: Conduct thorough testing, prepare for deployment
- Deliverables: Complete test suite, deployment scripts, production deployment

**Sprint 8: Post-Deployment Support and Maintenance**

- Duration: 2 weeks
- Goals: Monitor system post-deployment, fix issues, gather feedback
- Deliverables: Monitoring reports, bug fixes, user feedback report
