-- Inserting some members
INSERT INTO members
(member_name, email, birthday  ) VALUES ('Adam', 'adamkriger@gmail.com', '06/07/1984' );

INSERT INTO members
(member_name, email, birthday  ) VALUES ('Ben', 'benkriger@gmail.com', '06/07/1984' );

INSERT INTO members
(member_name, email, birthday  ) VALUES ('Lindsay', 'lkrigs@gmail.com', '06/07/1984' );

INSERT INTO members
(member_name, email, birthday  ) VALUES ('Lonely', 'lonely@gmail.com', '06/07/1984' );

INSERT INTO members
(member_name, email, birthday  ) VALUES ('friendless', 'friendless@gmail.com', '06/07/1984' );


-- Inserting some friends
INSERT INTO friends
(members_id, friend_Id ) VALUES (1,2);

INSERT INTO friends
(members_id, friend_Id ) VALUES (2,3);

INSERT INTO friends
(members_id, friend_Id ) VALUES (1,3);
