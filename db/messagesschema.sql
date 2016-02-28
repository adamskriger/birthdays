DROP TABLE if EXISTS messages CASCADE;

CREATE TABLE messages (
  message_id SERIAL UNIQUE PRIMARY KEY,
  members_id INTEGER REFERENCES members,
  message TEXT

);
