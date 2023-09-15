import { sql } from './pgsql.js';

sql`
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  created_at BIGINT NOT NULL,
  name VARCHAR(190) NOT NULL,
  password VARCHAR(16) NOT NULL,
  salt VARCHAR(40) NOT NULL,
  contact VARCHAR(32) NOT NULL
);
`.then(() => console.log('table created'));

sql`
CREATE TABLE questions (
  id TEXT PRIMARY KEY,
  author_id TEXT REFERENCES users(id),
  author_name VARCHAR(190) NOT NULL,
  title VARCHAR(255) NOT NULL,
  question TEXT NOT NULL,
  upvotes INT DEFAULT 0
);
`.then(() => console.log('table created'));
