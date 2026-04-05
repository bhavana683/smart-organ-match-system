# Test Data Setup - Two Methods

## Method 1: Automatic Database Insertion (FASTEST ⚡)

### Prerequisites
- Backend running (`npm start` in `backend/`)
- MongoDB running
- All packages installed

### Steps

1. **Run the test data script:**
   ```bash
   cd backend
   node scripts/insertTestData.js
   ```

2. **Expected output:**
   ```
   ✅ MongoDB connected
   🗑️  Cleared previous test data
   ✅ Inserted 40 donors
   ✅ Inserted 12 recipients
   
   📊 Test Data Summary:
   ✅ 10 Kidney Donors + 3 Recipients
   ✅ 10 Heart Donors + 3 Recipients
   ✅ 10 Lung Donors + 3 Recipients
   ✅ 10 Liver Donors + 3 Recipients
   
   🔑 Login Password for all: Test@123
   
   🚀 Test data ready! Start your frontend and test matching.
   ```

3. **Done!** All 52 records inserted in <5 seconds

---

## Method 2: Manual Frontend Registration (LEARNING ✍️)

Use this if you want to understand the registration flow.

### For Quick Copy-Paste Data
Open: `QUICK_DATA_ENTRY.md`
- Has all donor/recipient data in easy format
- Organized by organ type
- Copy values directly to forms

### For Detailed Step-by-Step Guide
Open: `TEST_DATA_GUIDE.md`
- Complete instructions for each organ
- Medical field requirements
- Expected behavior examples
- Testing checklist

### General Process
1. Start frontend: `npm run dev` in `project/`
2. Go to `/donor-registration`
3. Enter donor details from `QUICK_DATA_ENTRY.md`
4. Proceed to medical details
5. Add organ-specific medical value
6. Repeat for all 40 donors
7. Then register 12 recipients similarly

**Time estimate: 30-45 minutes for manual entry**

---

## Quick Comparison

| Method | Time | Effort | Learning |
|--------|------|--------|----------|
| Auto Script | 2 min | ⭐ | None |
| Manual Entry | 30-45 min | ⭐⭐⭐⭐⭐ | High |

**Recommendation**: Use **Auto Script** first to test system, then **Manual Entry** to verify forms work.

---

## Testing After Data Setup

### Step 1: Verify Data in Database
```bash
# If MongoDB Compass installed, connect to:
mongodb://localhost:27017/organ_transplant

# Check collections:
- Donors (should show 40 records)
- Recipients (should show 12 records)
```

### Step 2: Test Kidney Matching
1. Open frontend: `http://localhost:5173`
2. Go to `/recipient-login`
3. Login with: 
   - Email: `john@kidney.test`
   - Password: `Test@123`
4. Click "Find Matches"
5. Should see top 5 kidney donors with:
   - Match scores (0.1-0.95)
   - Compatibility badges
   - All donor details
   - Accept button

### Step 3: Verify Matching Quality
For John Doe (kidney, age 50, O+, GFR 25):
- ✅ O+ donors (Emily Davis, Christopher Martin) should rank higher
- ✅ Donors with high GFR (Jessica 98, Elizabeth 94) should rank higher
- ✅ Age-compatible donors (40-55) should rank higher
- ✅ Total 10 kidney donors available
- ✅ Top 5 shown, sorted by score

### Step 4: Test Other Organs
```
Kidney Recipient: john@kidney.test
Heart Recipient: michael@heart.test
Lung Recipient: andrew@lung.test
Liver Recipient: justin@liver.test

All passwords: Test@123
```

---

## Troubleshooting

### "No matches found"
- Check backend logs for errors
- Verify Flask API running on port 5001
- Check donors have correct organ type
- Ensure donors have status: "active"

### "MongoDB connection failed"
- Start MongoDB: `mongod`
- Check connection string in `.env`

### "Email already exists"
- Run script again (it clears old test data first)
- Or manually delete test records from MongoDB

### Wrong organ type showing
- Verify recipient.organNeeded is set correctly
- Check donor.organs[organType] exists

---

## Data Structure After Insertion

### Donor Record Example (Kidney)
```javascript
{
  fullName: "James Wilson",
  age: 45,
  gender: "Male",
  bloodGroup: "O+",
  phone: "555-0101",
  email: "james@kidney.test",
  password: "hashed_Test@123",
  status: "active",
  organs: {
    kidney: {
      donor_GFR: 95
    }
  }
}
```

### Recipient Record Example (Kidney)
```javascript
{
  fullName: "John Doe",
  age: 50,
  gender: "Male",
  bloodGroup: "O+",
  height: 180,
  weight: 85,
  bmi: 26.2,
  contactNumber: "555-0111",
  email: "john@kidney.test",
  password: "hashed_Test@123",
  organNeeded: "kidney",
  urgencyLevel: "High",
  status: "waiting",
  organSpecificData: {
    recipient_GFR: 25
  },
  hospital: {
    name: "City General Hospital",
    city: "New York",
    state: "NY",
    doctorName: "Dr. Smith"
  }
}
```

---

## Login Credentials (After Any Method)

### For Testing - Use These Emails + Password: `Test@123`

**Kidney:**
- Donor: `james@kidney.test`, `sarah@kidney.test`, etc.
- Recipient: `john@kidney.test`, `mary@kidney.test`, `peter@kidney.test`

**Heart:**
- Donor: `george@heart.test`, `patricia@heart.test`, etc.
- Recipient: `michael@heart.test`, `rachel@heart.test`, `william@heart.test`

**Lung:**
- Donor: `richard@lung.test`, `karen@lung.test`, etc.
- Recipient: `andrew@lung.test`, `stephanie@lung.test`, `kevin@lung.test`

**Liver:**
- Donor: `kevin@liver.test`, `donna@liver.test`, etc.
- Recipient: `justin@liver.test`, `linda@liver.test`, `ryan@liver.test`

---

## Full Testing Checklist

After data insertion complete:

- [ ] Kidney Recipient login → Find Matches → 5 results shown
- [ ] Heart Recipient login → Find Matches → 5 results shown
- [ ] Lung Recipient login → Find Matches → 5 results shown
- [ ] Liver Recipient login → Find Matches → 5 results shown
- [ ] Match scores between 0.1 - 0.95
- [ ] Blood type matches score higher
- [ ] Age-compatible donors rank higher
- [ ] Top 5 sorted by score (highest first)
- [ ] Compatibility badges show correct colors
- [ ] All donor details display correctly
- [ ] Phone numbers visible
- [ ] Accept match button works
- [ ] Donor status changes to "completed" after accept

---

## Useful MongoDB Queries

```javascript
// Count test donors
db.donors.countDocuments({ email: { $regex: /@kidney.test|@heart.test|@lung.test|@liver.test/ } })

// Count test recipients
db.recipients.countDocuments({ email: { $regex: /@kidney.test|@heart.test|@lung.test|@liver.test/ } })

// Find kidney donors only
db.donors.find({ "organs.kidney": { $exists: true, $ne: null } })

// Find kidney recipients needing matches
db.recipients.find({ organNeeded: "kidney", status: "waiting" })

// Clear test data
db.donors.deleteMany({ email: { $regex: /@kidney.test|@heart.test|@lung.test|@liver.test/ } })
db.recipients.deleteMany({ email: { $regex: /@kidney.test|@heart.test|@lung.test|@liver.test/ } })
```

---

## Next Steps

1. ✅ Choose Method 1 (Auto) or Method 2 (Manual)
2. ✅ Insert test data
3. ✅ Open frontend on `http://localhost:5173`
4. ✅ Test each organ type
5. ✅ Verify matching quality
6. ✅ Test accept match flow
7. ✅ Check database updates

---

## Support Files

- **TEST_DATA_GUIDE.md** - Detailed step-by-step for manual entry
- **QUICK_DATA_ENTRY.md** - Quick copy-paste reference
- **insertTestData.js** - Automatic database insertion script
- **MULTI_ORGAN_INTEGRATION_GUIDE.md** - System architecture
- **QUICK_START.md** - System overview

Select the documentation that fits your approach! 🚀
