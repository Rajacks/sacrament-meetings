
CREATE TABLE IF NOT EXISTS meetings (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  meeting_type VARCHAR(20) NOT NULL,
  presiding VARCHAR(255) NOT NULL,
  conducting VARCHAR(255) NOT NULL,
  opening_hymn_number INTEGER NOT NULL,
  opening_hymn_title VARCHAR(255) NOT NULL,
  opening_prayer VARCHAR(255) NOT NULL,
  sacrament_hymn_number INTEGER NOT NULL,
  sacrament_hymn_title VARCHAR(255) NOT NULL,
  closing_hymn_number INTEGER NOT NULL,
  closing_hymn_title VARCHAR(255) NOT NULL,
  closing_prayer VARCHAR(255) NOT NULL,
  stake_business BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS announcements (
  id SERIAL PRIMARY KEY,
  meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ward_business (
  id SERIAL PRIMARY KEY,
  meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS speakers (
  id SERIAL PRIMARY KEY,
  meeting_id INTEGER REFERENCES meetings(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  topic TEXT NOT NULL,
  type VARCHAR(30) NOT NULL
);
