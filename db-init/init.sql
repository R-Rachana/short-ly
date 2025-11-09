-- This script runs automatically the first time the database container is created.

CREATE TABLE IF NOT EXISTS urls (
  id SERIAL PRIMARY KEY,
  long_url TEXT NOT NULL,
  short_code VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO urls (long_url, short_code) 
VALUES ('https://www.google.com', 'google')
ON CONFLICT (short_code) DO NOTHING;