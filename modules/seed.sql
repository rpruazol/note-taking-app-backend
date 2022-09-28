DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS boards;

CREATE TABLE IF NOT EXISTS notes (
id serial PRIMARY KEY,
title VARCHAR (255),
description VARCHAR (255),
user_id VARCHAR (255),
created_at TIMESTAMP,
updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS boards (
id serial PRIMARY KEY,
name VARCHAR (255),
created_at TIMESTAMP
);




INSERT INTO notes (
  title,
  description,
  created_at
)
VALUES (
  'test note',
  'this is a test note to test saving to the database.  hello world.',
  NOW()
);



INSERT INTO boards (
  name,
  created_at
)
VALUES (
  'To Do',
  NOW()
)
RETURNING *;