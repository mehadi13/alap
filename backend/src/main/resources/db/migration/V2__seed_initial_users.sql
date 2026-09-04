-- V2: Seed Default Admin and Client Accounts into PostgreSQL

INSERT INTO users (id, name, email, password, company, phone, role, created_at)
VALUES 
  ('usr-admin-001', 'ALAP System Admin', 'admin@alap.ai', 'hashed_admin123', 'ALAP Technologies', '+880 1700-000000', 'ADMIN', NOW()),
  ('usr-client-001', 'Tanvir Ahmed', 'client@alap.ai', 'hashed_client123', 'Metro E-Store', '+880 1711-223344', 'CLIENT', NOW())
ON CONFLICT (email) DO NOTHING;
