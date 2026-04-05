# Quick Reference - Copy & Paste Ready Test Data

## KIDNEY DONORS (10)
```
Copy these one by one into the frontend form:

1. James Wilson | 45 | Male | O+ | 555-0101 | james@kidney.test | GFR: 95
2. Sarah Johnson | 38 | Female | A+ | 555-0102 | sarah@kidney.test | GFR: 92
3. Michael Brown | 52 | Male | B+ | 555-0103 | michael@kidney.test | GFR: 88
4. Emily Davis | 41 | Female | O- | 555-0104 | emily@kidney.test | GFR: 96
5. Robert Miller | 49 | Male | AB+ | 555-0105 | robert@kidney.test | GFR: 85
6. Jessica Taylor | 36 | Female | B- | 555-0106 | jessica@kidney.test | GFR: 98
7. David Anderson | 47 | Male | A- | 555-0107 | david@kidney.test | GFR: 90
8. Amanda White | 44 | Female | AB- | 555-0108 | amanda@kidney.test | GFR: 93
9. Christopher Martin | 50 | Male | O+ | 555-0109 | christopher@kidney.test | GFR: 87
10. Elizabeth Thompson | 39 | Female | A+ | 555-0110 | elizabeth@kidney.test | GFR: 94
```

## KIDNEY RECIPIENTS (3)
```
1. John Doe | 50 | Male | O+ | 180cm | 85kg | High | GFR: 25
2. Mary Smith | 48 | Female | A+ | 165cm | 68kg | Critical | GFR: 20
3. Peter Johnson | 55 | Male | B+ | 175cm | 80kg | High | GFR: 28
```

---

## HEART DONORS (10)
```
1. George Clark | 35 | Male | A+ | 555-0201 | george@heart.test | HF: 52
2. Patricia Lewis | 42 | Female | B+ | 555-0202 | patricia@heart.test | HF: 55
3. Joseph Lee | 38 | Male | O+ | 555-0203 | joseph@heart.test | HF: 50
4. Maria Garcia | 45 | Female | AB+ | 555-0204 | maria@heart.test | HF: 54
5. Thomas Martinez | 40 | Male | O- | 555-0205 | thomas@heart.test | HF: 51
6. Jennifer Rodriguez | 37 | Female | A- | 555-0206 | jennifer@heart.test | HF: 56
7. Charles Wilson | 43 | Male | B- | 555-0207 | charles@heart.test | HF: 49
8. Barbara Anderson | 39 | Female | AB- | 555-0208 | barbara@heart.test | HF: 53
9. Daniel Taylor | 44 | Male | A+ | 555-0209 | daniel@heart.test | HF: 52
10. Susan Thomas | 36 | Female | B+ | 555-0210 | susan@heart.test | HF: 55
```

## HEART RECIPIENTS (3)
```
1. Michael Heart | 52 | Male | A+ | 182cm | 90kg | Critical | HF: 30
2. Rachel Carter | 49 | Female | B+ | 168cm | 72kg | Critical | HF: 28
3. William Nelson | 56 | Male | O+ | 178cm | 88kg | High | HF: 32
```

---

## LUNG DONORS (10)
```
1. Richard Jackson | 48 | Male | O+ | 555-0301 | richard@lung.test | FEV: 78
2. Karen Brown | 44 | Female | A+ | 555-0302 | karen@lung.test | FEV: 81
3. Paul Jones | 51 | Male | B+ | 555-0303 | paul@lung.test | FEV: 76
4. Nancy Davis | 46 | Female | AB+ | 555-0304 | nancy@lung.test | FEV: 79
5. Mark Williams | 49 | Male | O- | 555-0305 | mark@lung.test | FEV: 77
6. Lisa Rodriguez | 43 | Female | A- | 555-0306 | lisa@lung.test | FEV: 82
7. Donald Miller | 52 | Male | B- | 555-0307 | donald@lung.test | FEV: 75
8. Sandra Martinez | 45 | Female | AB- | 555-0308 | sandra@lung.test | FEV: 80
9. Steven Anderson | 50 | Male | O+ | 555-0309 | steven@lung.test | FEV: 78
10. Ashley Taylor | 42 | Female | A+ | 555-0310 | ashley@lung.test | FEV: 83
```

## LUNG RECIPIENTS (3)
```
1. Andrew Lung | 54 | Male | O+ | 180cm | 85kg | Critical | FEV: 42
2. Stephanie Grant | 51 | Female | A+ | 166cm | 70kg | High | FEV: 45
3. Kevin Foster | 57 | Male | B+ | 176cm | 82kg | Critical | FEV: 41
```

---

## LIVER DONORS (10)
```
1. Kevin Harris | 46 | Male | A+ | 555-0401 | kevin@liver.test | AST: 32
2. Donna Clark | 43 | Female | B+ | 555-0402 | donna@liver.test | AST: 28
3. Brian Lewis | 50 | Male | O+ | 555-0403 | brian@liver.test | AST: 35
4. Carol Walker | 44 | Female | AB+ | 555-0404 | carol@liver.test | AST: 30
5. Edward Hall | 48 | Male | O- | 555-0405 | edward@liver.test | AST: 33
6. Dorothy Young | 41 | Female | A- | 555-0406 | dorothy@liver.test | AST: 27
7. Ronald King | 51 | Male | B- | 555-0407 | ronald@liver.test | AST: 34
8. Shirley Scott | 45 | Female | AB- | 555-0408 | shirley@liver.test | AST: 29
9. Gary Green | 47 | Male | A+ | 555-0409 | gary@liver.test | AST: 32
10. Janet Adams | 42 | Female | O+ | 555-0410 | janet@liver.test | AST: 31
```

## LIVER RECIPIENTS (3)
```
1. Justin Liver | 53 | Male | A+ | 181cm | 88kg | Critical | AST: 42
2. Linda Harper | 50 | Female | B+ | 167cm | 74kg | High | AST: 45
3. Ryan Palmer | 56 | Male | O+ | 177cm | 86kg | Critical | AST: 48
```

---

## Registration Sequence

### Step-by-Step Process

#### 1. KIDNEY DONORS (1-10)
For each donor, register at `/donor-registration`:
- Full Name (from list)
- Age (from list)
- Gender (from list)
- Blood Group (from list)
- Phone (from list)
- Email (from list)
- **Select Organ: KIDNEY**
- **Check consent boxes**
- Go to Medical Details
- **Enter donor_GFR value**

#### 2. KIDNEY RECIPIENTS (1-3)
For each recipient, register at `/recipient-registration`:
- **Select Organ: KIDNEY**
- Full Name (from list)
- Age, Gender, Blood Group
- Height, Weight
- Contact number, email
- Hospital details (any hospital)
- **Organ-Specific Data → recipient_GFR**
- Urgency (High/Critical)

#### 3. HEART DONORS (1-10)
At `/donor-registration`:
- Full Name, Age, Gender, Blood Group, Phone, Email
- **Select Organ: HEART**
- **Guardian info required**: Name (any), Relation (Sister/Brother), Phone
- **Check heart consent**
- Medical: **heartFunction value**

#### 4. HEART RECIPIENTS (1-3)
At `/recipient-registration`:
- **Select Organ: HEART**
- Basic info + hospital details
- **Organ-Specific Data → heartFunction**

#### 5. LUNG DONORS (1-10)
At `/donor-registration`:
- Full Name, Age, Gender, Blood Group, Phone, Email
- **Select Organ: LUNG**
- **Donation Type: Living** (or post-death)
- Medical: **FEV value**

#### 6. LUNG RECIPIENTS (1-3)
At `/recipient-registration`:
- **Select Organ: LUNG**
- Basic info + hospital details
- **Organ-Specific Data → FEV**

#### 7. LIVER DONORS (1-10)
At `/donor-registration`:
- Full Name, Age, Gender, Blood Group, Phone, Email
- **Select Organ: LIVER**
- **Check living donation consent**
- Medical: **AST value**

#### 8. LIVER RECIPIENTS (1-3)
At `/recipient-registration`:
- **Select Organ: LIVER**
- Basic info + hospital details
- **Organ-Specific Data → AST**

---

## Login Credentials (After Registration)

After registering each person, login credentials are:
- **Email**: (from data list)
- **Password**: (use same for all: "Test@123" or any password set during registration)

---

## Testing Sequence

Once all data is registered:

1. **Login as Kidney Recipient #1** (John Doe)
   - Click "Find Matches"
   - Verify top 5 kidney donors appear
   - Check scores between 0.1-0.95
   - Blood type O+ donors should rank higher

2. **Login as Heart Recipient #1** (Michael Heart)
   - Click "Find Matches"
   - Verify top 5 heart donors appear
   - A+ donors should rank higher
   - Age-compatible donors (35-50) should rank higher

3. **Login as Lung Recipient #1** (Andrew Lung)
   - Click "Find Matches"
   - Verify top 5 lung donors appear
   - Check FEV compatibility scoring

4. **Login as Liver Recipient #1** (Justin Liver)
   - Click "Find Matches"
   - Verify top 5 liver donors appear
   - Check AST compatibility

---

## Expected Match Results Examples

### Kidney Matching
```
Expected top match for John Doe (50, O+, GFR=25):
1. Emily Davis (41, O-, GFR=96) - Blood matches, age suitable, high GFR → Score: ~85%
2. Jessica Taylor (36, B-, GFR=98) - Age different, high GFR → Score: ~70%
3. Elizabeth Thompson (39, A+, GFR=94) - Both factors good → Score: ~72%
...
```

### Heart Matching
```
Expected top match for Michael Heart (52, A+, HF=30):
1. George Clark (35, A+, HF=52) - Perfect blood match, good HF → Score: ~88%
2. Patricia Lewis (42, B+, HF=55) - Age closer, decent HF → Score: ~75%
```

---

## Hospital Details (Same for All)

When asked for hospital info in recipient registration:
```
Hospital Name: City General Hospital
City: New York
State: NY
Doctor Name: Dr. Smith
```

(Or use any hospital name - it's not validated)

---

## Notes

- ✅ All donors should have status "active" after registration
- ✅ All recipients should have status "waiting" after registration
- ✅ Donor GFR range: 85-98 (higher is better)
- ✅ Recipient GFR range: 20-28 (lower means more critical)
- ✅ Age differences of 5-10 years preferred
- ✅ Exact blood type match gets 0.35 points, mismatch gets 0.15

---

Once data is entered, you're ready to test the full matching system! 🚀
