-- Migration: Add Referral System to Newsletter Subscribers
-- Created: 2025-12-08
-- Description: Adds referral tracking fields to enable viral waitlist system

-- Add new columns to newsletter_subscribers table
ALTER TABLE newsletter_subscribers
  ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS referred_by TEXT,
  ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'insider',
  ADD COLUMN IF NOT EXISTS signup_number INTEGER,
  ADD COLUMN IF NOT EXISTS referral_count INTEGER DEFAULT 0;

-- Create index on referral_code for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_referral_code
  ON newsletter_subscribers(referral_code);

-- Create index on referred_by for analytics
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_referred_by
  ON newsletter_subscribers(referred_by);

-- Update existing subscribers with signup numbers
DO $$
DECLARE
  subscriber_record RECORD;
  counter INTEGER := 1;
BEGIN
  FOR subscriber_record IN
    SELECT id FROM newsletter_subscribers
    ORDER BY subscribed_at ASC
  LOOP
    UPDATE newsletter_subscribers
    SET signup_number = counter
    WHERE id = subscriber_record.id;
    counter := counter + 1;
  END LOOP;
END $$;

-- Generate referral codes for existing subscribers
UPDATE newsletter_subscribers
SET referral_code = UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6))
WHERE referral_code IS NULL;

-- Ensure all existing subscribers are in 'insider' tier
UPDATE newsletter_subscribers
SET tier = 'insider'
WHERE tier IS NULL;

-- Ensure all existing subscribers have 0 referrals
UPDATE newsletter_subscribers
SET referral_count = 0
WHERE referral_count IS NULL;

-- Add comment to table
COMMENT ON COLUMN newsletter_subscribers.referral_code IS 'Unique code for this subscriber to share';
COMMENT ON COLUMN newsletter_subscribers.referred_by IS 'Referral code of the person who referred this subscriber';
COMMENT ON COLUMN newsletter_subscribers.tier IS 'Current tier: insider, early_access, or founding_member';
COMMENT ON COLUMN newsletter_subscribers.signup_number IS 'Position in the waitlist';
COMMENT ON COLUMN newsletter_subscribers.referral_count IS 'Number of successful referrals';
