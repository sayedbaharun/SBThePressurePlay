# Replit Database Migration Prompt

Copy and paste this prompt into Replit AI to apply the referral system database migration:

---

## PROMPT TO COPY:

```
I need you to run a database migration to add the referral system columns to my newsletter_subscribers table.

My database is PostgreSQL (Neon) and the connection is in the DATABASE_URL environment variable.

Please run the following SQL migration against my database:

ALTER TABLE newsletter_subscribers
  ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS referred_by TEXT,
  ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'insider',
  ADD COLUMN IF NOT EXISTS signup_number INTEGER,
  ADD COLUMN IF NOT EXISTS referral_count INTEGER DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_referral_code
  ON newsletter_subscribers(referral_code);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_referred_by
  ON newsletter_subscribers(referred_by);

Then verify the columns were added by running:
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'newsletter_subscribers';

If there are existing subscribers, also run:
UPDATE newsletter_subscribers
SET referral_code = UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6))
WHERE referral_code IS NULL;

UPDATE newsletter_subscribers
SET tier = 'insider'
WHERE tier IS NULL;

UPDATE newsletter_subscribers
SET referral_count = 0
WHERE referral_count IS NULL;

Show me the results to confirm the migration was successful.
```

---

## ALTERNATIVE: Shell Command Prompt

If the above doesn't work, try this:

```
Run this command in the shell to apply my database migration:

psql $DATABASE_URL -f migrations/add_referral_system.sql

Then verify it worked by running:
psql $DATABASE_URL -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'newsletter_subscribers';"
```

---

## ALTERNATIVE: Create a Migration Script

If neither works, ask Replit to:

```
Create a Node.js script called run-migration.js that:
1. Connects to my PostgreSQL database using DATABASE_URL
2. Adds these columns to newsletter_subscribers table:
   - referral_code (TEXT, UNIQUE)
   - referred_by (TEXT)
   - tier (TEXT, default 'insider')
   - signup_number (INTEGER)
   - referral_count (INTEGER, default 0)
3. Creates indexes on referral_code and referred_by
4. Logs success or failure

Then run the script with: node run-migration.js
```

---

## Expected Result

After migration, your `newsletter_subscribers` table should have these columns:

| Column | Type | Default |
|--------|------|---------|
| id | integer | auto |
| email | text | - |
| name | text | - |
| phone | text | - |
| country | text | - |
| subscribed_at | timestamp | now() |
| confirmed | boolean | false |
| **referral_code** | text | - |
| **referred_by** | text | - |
| **tier** | text | 'insider' |
| **signup_number** | integer | - |
| **referral_count** | integer | 0 |

The **bold** columns are the new ones added by this migration.

---

## Troubleshooting

**"Table doesn't exist"** → Run `npm run db:push` first to create tables from schema

**"Permission denied"** → Check DATABASE_URL is set correctly in Replit Secrets

**"Connection refused"** → Your Neon database may be paused, visit neon.tech to wake it
