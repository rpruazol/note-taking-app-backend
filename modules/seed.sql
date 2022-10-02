DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS boards;

CREATE TABLE IF NOT EXISTS notes (
id serial PRIMARY KEY,
title VARCHAR (255),
description VARCHAR (255),
user_id VARCHAR (255),
board VARCHAR (255),
board_id VARCHAR(255),
created_at TIMESTAMP,
updated_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS boards (
id serial PRIMARY KEY,
name VARCHAR (255),
board_order serial,
created_at TIMESTAMP
);


INSERT INTO boards (
  name,
  board_order,
  created_at
)
VALUES (
  'To Do',
  1,
  NOW()
)
RETURNING *;

INSERT INTO boards (
  name,
  board_order,
  created_at
)
VALUES (
  'Other',
  2,
  NOW()
)
RETURNING *;

INSERT INTO boards (
  name,
  board_order,
  created_at
)
VALUES (
  'One more',
  3,
  NOW()
)
RETURNING *;


INSERT INTO notes (
  title,
  description,
  board,
  board_id,
  created_at
)
VALUES (
  'test note',
  'this is a test note to test saving to the database.  hello world.',
  'To Do',
  1,
  NOW()
);

INSERT INTO notes (
  title,
  description,
  board,
  board_id,
  created_at
)
VALUES (
  'other note',
  'this is a note that should go in the "Other" board',
  'Other',
  2,
  NOW()
);

INSERT INTO notes (
  title,
  description,
  board,
  board_id,
  created_at
)
VALUES (
  'other note',
  'this is a note that should go in the "Other" board',
  'Other',
  2,
  NOW()
);

INSERT INTO notes (
  title,
  description,
  board,
  board_id,
  created_at
)
VALUES (
  'other note',
  'lorum ipsum lorum ipsum lorum ipsum lorum ipsum',
  'One more',
  3,
  NOW()
);

INSERT INTO notes (
  title,
  description,
  board,
  board_id,
  created_at
)
VALUES (
  'other note',
  'lorum ipsum lorum ipsum lorum ipsum lorum ipsum',
  'One more',
  3,
  NOW()
);

INSERT INTO notes (
  title,
  description,
  board,
  board_id,
  created_at
)
VALUES (
  'other note',
  'lorum ipsum lorum ipsum lorum ipsum lorum ipsum',
  'One more',
  3,
  NOW()
);

