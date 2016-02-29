


CREATE TABLE members (

  members_id SERIAL UNIQUE PRIMARY KEY,
  member_name text,
  email VARCHAR(320) UNIQUE,
  birthday date,
  password_digest text,
  message_id INTEGER
);

CREATE TABLE friends (

    members_id INTEGER REFERENCES members (members_id),
    friend_id INTEGER REFERENCES members (members_id),
    PRIMARY KEY (members_id, friend_id)
);

CREATE TABLE messages (
    mid SERIAL UNIQUE PRIMARY KEY,
    members_id INTEGER,
    sender_id INTEGER,
    message text

);
