-- auth-db schema

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(50)  UNIQUE NOT NULL,
  email         VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(20)  DEFAULT 'member',
  created_at    TIMESTAMP    DEFAULT NOW(),
  last_login    TIMESTAMP
);

CREATE TABLE IF NOT EXISTS logs (
  id         SERIAL PRIMARY KEY,
  level      VARCHAR(10)  NOT NULL,
  event      VARCHAR(100) NOT NULL,
  user_id    INTEGER,
  message    TEXT,
  meta       JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed Users
INSERT INTO users (username, email, password_hash, role) VALUES
  ('alice', 'alice@lab.local', '$2a$10$q3g/74gk8uQ8tnPKpJeQFulUPzYB3FV9H/.JzMrZKGHhgF4iDeLDq', 'member'),
  ('bob',   'bob@lab.local',   '$2a$10$MaaUKTHPXyf9ba9IblCy1OA6pEOfTxGHwdhEhcm4Twn3LntVN6WH6', 'member'),
  ('admin', 'admin@lab.local', '$2a$10$F/mCmls47GCGLE0uKHOt7.NxL4AXp4wQfwyOW5rmfkpD5g3.LaE/O', 'admin')
ON CONFLICT DO NOTHING;