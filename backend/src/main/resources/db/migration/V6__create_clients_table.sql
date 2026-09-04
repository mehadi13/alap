-- V6: Create Clients Table & Indices

CREATE TABLE IF NOT EXISTS clients (
    id BIGSERIAL PRIMARY KEY,
    client_code VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(255),
    industry VARCHAR(255),
    solution VARCHAR(255),
    status VARCHAR(255) DEFAULT 'Onboarding',
    monthly_value VARCHAR(255) DEFAULT '$500 / mo',
    start_date VARCHAR(255),
    last_contact VARCHAR(255),
    notes VARCHAR(2000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_client_code ON clients(client_code);
