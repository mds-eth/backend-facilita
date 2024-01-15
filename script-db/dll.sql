DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'database_facilita') THEN
    CREATE DATABASE database_facilita;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  deleted BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  deleted BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS client_locations (
  id SERIAL PRIMARY KEY,
  client_id INT,
  location_name VARCHAR(255),
  coordinate_x FLOAT NOT NULL,
  coordinate_y FLOAT NOT NULL,
  address VARCHAR(255),
  number VARCHAR(255),
  cep VARCHAR(10),
  deleted BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

INSERT INTO users (name, email, password, deleted, created_at, updated_at) VALUES
  ('Jhon Doe', 'jhon.doe@email.com', '$2a$10$wA84ktG9x459r02UnZ.vY.FPFKzoTwWlaDy.JQNjEf82c4qEzV5Iq', FALSE, '2024-01-11 10:10', '2024-01-11 10:10');

INSERT INTO clients (name, email, phone, deleted, created_at, updated_at) VALUES
  ('Richard Low', 'Richard.Low@email.com', '41999999991', FALSE, '2024-01-11 10:10', '2024-01-11 10:10'),
  ('Mitchel Dun', 'mitchel@email.com', '41999999992', FALSE, '2024-01-11 10:10', '2024-01-11 10:10'),
  ('Mac Holy', 'mac@email.com', '41999999993', FALSE, '2024-01-11 10:10', '2024-01-11 10:10'),
  ('Eduard Snowden', 'eduard@email.com', '41999999994', FALSE, '2024-01-11 10:10', '2024-01-11 10:10');

INSERT INTO client_locations (client_id, location_name, coordinate_x, coordinate_y, address, number, cep, deleted, created_at, updated_at) VALUES
  (1, 'PortoNave', -26.8806, -48.6487, 'Av. Portuária Vicente Honorato Coelho', '01', '88370-904', FALSE, '2024-01-11 10:25', '2024-01-11 10:25'),
  (2, 'Koch', -26.8234, -48.6211, 'R. Ver. Nereu Liberato Nunes', '191', '88370-232', FALSE, '2024-01-11 10:25', '2024-01-11 10:25'),
  (3, 'Top Haus', -26.8374, -48.6313, 'v. Pref. José Juvenal Mafra', '7155', '88372-900', FALSE, '2024-01-11 10:25', '2024-01-11 10:25'),
  (4, 'Aeroporto Navegantes', -26.8806, -48.6487, 'R. Osmar Gaya', '900', '88372-900', FALSE, '2024-01-11 10:25', '2024-01-11 10:25');
