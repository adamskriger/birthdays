DROP TABLE if EXISTS members CASCADE;
DROP TABLE if EXISTS friends CASCADE;

CREATE TABLE members (

  members_id SERIAL UNIQUE PRIMARY KEY,
  member_name text,
  email VARCHAR(320) UNIQUE,
  birthday date,
  password_digest text
);

CREATE TABLE friends (

    members_id INTEGER REFERENCES members (members_id),
    friend_id INTEGER REFERENCES members (members_id)

);
