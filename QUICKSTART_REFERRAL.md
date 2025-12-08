# Quick Start: Viral Referral System

## 🚀 Get Started in 3 Steps

### Step 1: Apply Database Migration

```bash
# Option A: Use the helper script
./migrations/apply_migration.sh

# Option B: Apply manually
psql $DATABASE_URL -f migrations/add_referral_system.sql
```

### Step 2: Restart Your Application

```bash
npm run dev
```

### Step 3: Test It Out

1. Visit `http://localhost:5000`
2. Scroll to newsletter section
3. Sign up with your name and email
4. See your referral link in the modal
5. Copy and share the link!

---

## 📊 How to Check Your Referral Stats

Visit: `http://localhost:5000/api/newsletter/referral/YOUR_CODE`

Example response:
```json
{
  "referralCode": "ABC123",
  "referralCount": 5,
  "tier": "early_access",
  "signupNumber": 42
}
```

---

## 🎯 Testing the Full Referral Flow

1. **Sign up** → Get your code (e.g., "ABC123")
2. **Copy link** → `http://localhost:5000/?ref=ABC123`
3. **Open in incognito** → Paste the link
4. **See referral banner** → "You've been referred!"
5. **Sign up again** → Use different email
6. **Check your stats** → You now have 1 referral!

---

## 🏆 Tier System

- **0 referrals** = Insider (default)
- **3 referrals** = Early Access 🎉
- **10 referrals** = Founding Member 👑

---

## 🔧 Troubleshooting

**Modal not showing?**
- Check browser console for errors
- Verify all components are imported correctly

**Referral not credited?**
- Check if referral code exists in database
- Verify localStorage has the referral code
- Check backend logs for errors

**Database error?**
- Ensure migration was applied successfully
- Check DATABASE_URL is set correctly
- Verify all new columns exist in the table

---

## 📝 What Was Changed

### Backend
- ✅ Added 5 new columns to `newsletter_subscribers` table
- ✅ Created referral utility functions
- ✅ Updated subscribe endpoint to handle referrals
- ✅ Added 2 new API endpoints for stats

### Frontend
- ✅ Created beautiful referral share modal
- ✅ Added referral code detection from URL
- ✅ Updated newsletter forms with referral handling
- ✅ Added social share buttons (Twitter, LinkedIn)
- ✅ Added localStorage persistence

### Files Modified/Created
```
shared/schema.ts                          (modified)
shared/referral-utils.ts                  (new)
server/storage.ts                         (modified)
server/routes.ts                          (modified)
client/src/components/newsletter-section.tsx      (modified)
client/src/components/referral-share-modal.tsx    (new)
client/src/pages/newsletter.tsx                   (modified)
migrations/add_referral_system.sql                (new)
migrations/apply_migration.sh                     (new)
```

---

## 📖 Full Documentation

See `REFERRAL_SYSTEM_IMPLEMENTATION.md` for complete details.

---

## 🎉 You're All Set!

The viral referral system is now ready to drive growth for The Pressure Play podcast!

Share your waitlist link and watch your subscriber count grow exponentially! 🚀
