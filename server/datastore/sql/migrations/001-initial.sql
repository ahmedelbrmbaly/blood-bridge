------------------------------------------------------------------
-- Up
------------------------------------------------------------------

CREATE TABLE base_users (
    user_id       INTEGER  PRIMARY KEY AUTOINCREMENT,
    user_type     VARCHAR  NOT NULL,
    user_name     VARCHAR  NOT NULL,
    user_email    VARCHAR  NOT NULL UNIQUE,
    user_password VARCHAR  NOT NULL,
    user_city     VARCHAR  NOT NULL,
    user_status   VARCHAR  NOT NULL
);


CREATE TABLE donors (
    donor_id      INTEGER  PRIMARY KEY UNIQUE,
    national_id   VARCHAR  NOT NULL UNIQUE,
    blood_type    VARCHAR  NOT NULL,
    last_donation DATE,
    FOREIGN KEY (donor_id) REFERENCES base_users(user_id)
);

