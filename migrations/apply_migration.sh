#!/bin/bash

# Script to apply the referral system migration
# Usage: ./migrations/apply_migration.sh

set -e

echo "========================================="
echo "Applying Referral System Migration"
echo "========================================="
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL environment variable is not set"
  echo "Please set it with: export DATABASE_URL='your-connection-string'"
  exit 1
fi

echo "✓ Database URL found"
echo ""

# Check if psql is available
if ! command -v psql &> /dev/null; then
  echo "❌ ERROR: psql command not found"
  echo "Please install PostgreSQL client"
  exit 1
fi

echo "✓ PostgreSQL client found"
echo ""

# Apply migration
echo "Applying migration..."
psql "$DATABASE_URL" -f migrations/add_referral_system.sql

if [ $? -eq 0 ]; then
  echo ""
  echo "========================================="
  echo "✅ Migration applied successfully!"
  echo "========================================="
  echo ""
  echo "Next steps:"
  echo "1. Restart your application: npm run dev"
  echo "2. Test the referral system at http://localhost:5000"
  echo "3. Sign up for the newsletter to get your referral code"
  echo ""
else
  echo ""
  echo "========================================="
  echo "❌ Migration failed"
  echo "========================================="
  echo ""
  echo "Please check the error messages above and try again"
  exit 1
fi
