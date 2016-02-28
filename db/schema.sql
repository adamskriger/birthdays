
CREATE TABLE members (

  members_id SERIAL UNIQUE PRIMARY KEY,
  member_name text,
  email VARCHAR(320) UNIQUE,
  birthday date,
  password_digest text,
  message_id text
);

CREATE TABLE friends (

    members_id INTEGER REFERENCES members (members_id),
    friend_id INTEGER REFERENCES members (members_id),
    PRIMARY KEY (members_id, friend_id)
);

CREATE TABLE messages (
  message_id SERIAL UNIQUE PRIMARY KEY,
  members_id INTEGER REFERENCES members,
  message TEXT

);
