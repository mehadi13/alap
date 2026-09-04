-- V5: Add channel_type column to consultations table ('message', 'meeting', 'call', 'voice note')

ALTER TABLE consultations 
ADD COLUMN IF NOT EXISTS channel_type VARCHAR(50) DEFAULT 'message';

-- Backfill existing database rows cleanly
UPDATE consultations SET channel_type = 'voice note' WHERE type = 'VOICE' OR problem_description LIKE '%[VOICE NOTE]%';
UPDATE consultations SET channel_type = 'call' WHERE type = 'CALL' OR problem_description LIKE '%[CALL BACK REQUEST]%';
UPDATE consultations SET channel_type = 'meeting' WHERE type = 'MEETING' OR problem_description LIKE '%[MEETING REQUEST]%';
UPDATE consultations SET channel_type = 'message' WHERE channel_type IS NULL OR channel_type = 'TEXT';
