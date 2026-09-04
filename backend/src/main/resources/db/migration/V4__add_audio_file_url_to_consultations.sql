-- V4: Add audio_file_url column to consultations table for voice note recordings

ALTER TABLE consultations 
ADD COLUMN IF NOT EXISTS audio_file_url VARCHAR(512);
