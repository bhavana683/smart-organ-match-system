# 🚀 Complete Test Data Package - Ready to Use

## What's Included

### 📊 Test Data Files (Already Created)
```
✅ TEST_DATA_SETUP.md
   - Both methods (automatic + manual)
   - Side-by-side comparison
   - Troubleshooting guide

✅ TEST_DATA_GUIDE.md
   - Complete detailed guide
   - 40 donors + 12 recipients
   - Step-by-step registration
   - Testing checklist

✅ QUICK_DATA_ENTRY.md
   - Copy-paste ready format
   - Organized by organ
   - Quick reference cards

✅ backend/scripts/insertTestData.js
   - Automatic database insertion
   - One command setup
   - Clears old test data first
```

---

## 🎯 Choose Your Method

### Method 1: AUTOMATIC ⚡ (2 MINUTES)
**Best for:** Testing system quickly

```bash
# 1. Start backend
cd backend
npm start

# 2. In another terminal, run test data script
node scripts/insertTestData.js

# 3. Done! 40 donors + 12 recipients inserted
```

**Output:**
```
✅ Inserted 40 donors
✅ Inserted 12 recipients
🔑 Password for all: Test@123
🚀 Test data ready!
```

---

### Method 2: MANUAL ✍️ (30-45 MINUTES)
**Best for:** Learning the registration flow

1. Open: `QUICK_DATA_ENTRY.md`
2. Go to `http://localhost:5173/donor-registration`
3. Copy data from the file into forms
4. Repeat for all organs

---

## 📋 Test Data Summary

### Donors (40 Total)
```
Kidney:  10 donors (GFR: 85-98)
Heart:   10 donors (heartFunction: 49-56)
Lung:    10 donors (FEV: 75-83)
Liver:   10 donors (AST: 27-35)
```

### Recipients (12 Total)
```
Kidney:  3 recipients (GFR: 20-28) - High/Critical urgency
Heart:   3 recipients (HF: 28-32) - High/Critical urgency
Lung:    3 recipients (FEV: 41-45) - High/Critical urgency
Liver:   3 recipients (AST: 42-48) - High/Critical urgency
```

---

## 🔑 Login Credentials

All accounts after setup:
```
Username (Email): firstname@organtype.test
Password:         Test@123

Examples:
james@kidney.test       / Test@123  (Kidney Donor)
john@kidney.test        / Test@123  (Kidney Recipient)
george@heart.test       / Test@123  (Heart Donor)
michael@heart.test      / Test@123  (Heart Recipient)
```

---

## ✅ Testing After Data Setup

### Quick Test (5 minutes)
```
1. Start frontend: npm run dev (in project/)
2. Login: john@kidney.test / Test@123
3. Click "Find Matches"
4. Should see 5 kidney donors with scores
5. Verify: O+ donors rank higher, high GFR donors score better
```

### Full Test (15 minutes)
```
Test each organ:
- Kidney Recipient: john@kidney.test
- Heart Recipient: michael@heart.test
- Lung Recipient: andrew@lung.test
- Liver Recipient: justin@liver.test

For each:
✅ Click Find Matches
✅ See top 5 donors
✅ Check scores 0.1-0.95
✅ Click Accept Match
✅ Verify status changes
```

---

## 📁 File Organization

```
backend/
├── scripts/
│   └── insertTestData.js          ← Run this for automatic setup
├── models/
│   ├── Donor.js                   ← Donor schema
│   └── Recipient.js               ← Recipient schema
├── controllers/
│   └── mlController.js            ← Matching logic
└── routes/
    └── mlRoutes.js                ← /api/ml/matches endpoint

project/
├── src/pages/
│   ├── DonorRegistration.tsx       ← Manual registration
│   ├── DonorLogin.tsx
│   ├── DonorDashboard.tsx
│   ├── RecipentRegistration.tsx    ← Manual registration
│   ├── RecipientLogin.tsx
│   └── RecipientDashboard.tsx      ← Shows matching donors

Root Documentation/
├── TEST_DATA_SETUP.md              ← Start here
├── TEST_DATA_GUIDE.md              ← Detailed guide
├── QUICK_DATA_ENTRY.md             ← Copy-paste data
├── MULTI_ORGAN_INTEGRATION_GUIDE.md ← Architecture
└── QUICK_START.md                  ← System overview
```

---

## 🎮 System Workflow

### Registration Flow
```
Donor Registration (Manual/Auto)
    ↓
Enter basic info (name, age, blood group, phone)
    ↓
Select organ(s) to donate
    ↓
Enter medical data (GFR/FEV/AST/heartFunction)
    ↓
Donor created with status: "active"
```

### Matching Flow
```
Recipient Login
    ↓
View profile (organ type, blood group, medical need)
    ↓
Click "Find Matches"
    ↓
Backend fetches active donors with same organ
    ↓
ML API assigns compatibility scores
    ↓
Return top 5 best matches
    ↓
Recipient see: score %, badge, donor details
    ↓
Click "Accept Match"
    ↓
Donor status → "completed", Recipient status → "approved"
```

---

## 🧪 Expected Results

### Example: Kidney Matching
**Recipient:** John Doe (50, O+, GFR=25)

**Top matches should be:**
1. Emily Davis (41, O-, GFR=96) - 85%+ (exact blood, high GFR)
2. Elizabeth Thompson (39, A+, GFR=94) - 78%+ (similar age, high GFR)
3. Jessica Taylor (36, B-, GFR=98) - 72%+ (highest GFR, diff age)
etc.

**Why:** Blood type O matches O+/O- highly. High donor GFR is compatible with recipient's low GFR (kidney failure). Age 36-50 range is acceptable.

---

## 🔍 Verification Checklist

After setup, verify:
- [ ] 40 donors in database
- [ ] 12 recipients in database
- [ ] All donors have status: "active"
- [ ] All recipients have status: "waiting"
- [ ] Kidney donors have organs.kidney.donor_GFR
- [ ] Heart donors have organs.heart.heartFunction
- [ ] Lung donors have organs.lung.FEV
- [ ] Liver donors have organs.liver.AST
- [ ] Recipients have organSpecificData with medical values
- [ ] All emails follow pattern: name@organtype.test

---

## 🚨 Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "No matches found" | Donors inactive | Check status="active" in DB |
| "Email already exists" | Test data left over | Run script (auto-clears) or delete manually |
| "Connection failed" | MongoDB not running | Start: `mongod` |
| "Wrong organ shown" | Mismatched data | Verify organNeeded field |
| "All scores 0.5" | Flask offline | Start Flask on port 5001 |

---

## 🎯 Quick Start (2 Methods)

### FASTEST PATH (Automatic)
```bash
# 1. Terminal 1 - Backend
cd backend
npm start

# 2. Terminal 2 - Test Data
cd backend
node scripts/insertTestData.js

# 3. Terminal 3 - Frontend
cd project
npm run dev

# 4. Open browser & login
john@kidney.test / Test@123
```

### LEARNING PATH (Manual)
```bash
# 1. Start backend & frontend (same as above)
# 2. Go to /donor-registration
# 3. Click "Donor Registration"
# 4. Copy next donor from QUICK_DATA_ENTRY.md
# 5. Fill form & submit
# 6. Repeat 40x for donors, 12x for recipients
```

---

## 📞 Next Steps

1. **Choose method:** Automatic (2 min) or Manual (45 min)
2. **Run setup:** Use script or manual forms
3. **Login:** john@kidney.test (password: Test@123)
4. **Find matches:** Click button, see results
5. **Verify:** Check scores, compatibility, donor details
6. **Test all organs:** Kidney → Heart → Lung → Liver

---

## 📚 Documentation Quick Links

| Need | File |
|------|------|
| Overview of setup options | TEST_DATA_SETUP.md |
| Detailed step-by-step guide | TEST_DATA_GUIDE.md |
| Copy-paste data ready | QUICK_DATA_ENTRY.md |
| System architecture | MULTI_ORGAN_INTEGRATION_GUIDE.md |
| Quick reference | QUICK_START.md |

---

## ✨ You're All Set!

All test data is ready in multiple formats:
- ✅ Automatic script (2 min)
- ✅ Manual entry guide (45 min)
- ✅ Copy-paste data cards
- ✅ Complete documentation
- ✅ Verification checklists

Pick a method and start testing! 🎉

**Password for ALL accounts: `Test@123`**
