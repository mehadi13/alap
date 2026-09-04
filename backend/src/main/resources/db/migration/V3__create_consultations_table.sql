-- V3: Create Consultations Table & Seed Initial Consultations

CREATE TABLE IF NOT EXISTS consultations (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    company VARCHAR(255),
    business_type VARCHAR(255),
    problem_description TEXT NOT NULL,
    preferred_contact VARCHAR(50) DEFAULT 'phone',
    type VARCHAR(50) DEFAULT 'TEXT',
    duration_seconds INT DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at);

-- Seed Initial Consultation Leads into DB
--INSERT INTO consultations (id, name, email, phone, company, business_type, problem_description, preferred_contact, type, duration_seconds, status, created_at)
--VALUES
--  ('LEAD-2001', 'Mahmud Hasan', 'mahmud@nextgenfashion.com', '+880 1788-123456', 'NextGen Fashion Store', 'F-Commerce', 'We process 100+ orders daily manually into Steadfast courier. Taking 4 hours per day.', 'whatsapp', 'TEXT', 0, 'New', CURRENT_TIMESTAMP - INTERVAL '2 hours'),
--  ('LEAD-2002', 'Sabrina Karim', 'sabrina@apexvisa.com', '+880 1922-987654', 'Apex Visa Consultancy', 'Travel & Agencies', 'Clients ask same document checklist queries all day. We need an automated AI assistant.', 'phone', 'TEXT', 0, 'New', CURRENT_TIMESTAMP - INTERVAL '5 hours'),
--  ('LEAD-2003', 'Imtiaz Ali', 'imtiaz@greenleaf.com.bd', '+880 1677-445566', 'Green Leaf Agro Tech', 'Growing SMEs', 'Our stock reconciliation between warehouse and online sheets takes 6 hours every Friday.', 'email', 'TEXT', 0, 'Contacted', CURRENT_TIMESTAMP - INTERVAL '1 day')
--ON CONFLICT (id) DO NOTHING;
