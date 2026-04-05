# Test Data Generation Guide - Sample Donors & Recipients

## Overview
This guide provides ready-to-use sample data for testing all 4 organs:
- **40 Donor records** (10 each for kidney, heart, lung, liver)
- **12 Recipient records** (3 each for kidney, heart, lung, liver)

**Instructions**: Register through frontend forms as end user would.

---

## KIDNEY ORGAN - Test Data

### Kidney Donors (10)

| # | Name | Age | Gender | Blood | Phone | Medical: donor_GFR |
|---|------|-----|--------|-------|-------|-------------------|
| 1 | James Wilson | 45 | Male | O+ | 555-0101 | 95 |
| 2 | Sarah Johnson | 38 | Female | A+ | 555-0102 | 92 |
| 3 | Michael Brown | 52 | Male | B+ | 555-0103 | 88 |
| 4 | Emily Davis | 41 | Female | O- | 555-0104 | 96 |
| 5 | Robert Miller | 49 | Male | AB+ | 555-0105 | 85 |
| 6 | Jessica Taylor | 36 | Female | B- | 555-0106 | 98 |
| 7 | David Anderson | 47 | Male | A- | 555-0107 | 90 |
| 8 | Amanda White | 44 | Female | AB- | 555-0108 | 93 |
| 9 | Christopher Martin | 50 | Male | O+ | 555-0109 | 87 |
| 10 | Elizabeth Thompson | 39 | Female | A+ | 555-0110 | 94 |

### Kidney Recipients (3)

| # | Name | Age | Gender | Blood | Height | Weight | Urgency | Medical: recipient_GFR |
|---|------|-----|--------|-------|--------|--------|---------|----------------------|
| 1 | John Doe | 50 | Male | O+ | 180 | 85 | High | 25 |
| 2 | Mary Smith | 48 | Female | A+ | 165 | 68 | Critical | 20 |
| 3 | Peter Johnson | 55 | Male | B+ | 175 | 80 | High | 28 |

**Frontend Registration Steps for Kidney Donor:**
1. Click "Donor Registration"
2. Enter: Full Name (e.g., "James Wilson"), Age (45), Gender (Male), Blood Group (O+), Phone (555-0101), Email (james@email.com)
3. Select Organ: **KIDNEY**
4. Check "I consent for living organ donation"
5. Check "I agree to AI-based matching..."
6. Proceed to Medical Details
7. Enter donor_GFR: **95**
8. Complete registration

**Frontend Registration Steps for Kidney Recipient:**
1. Click "Recipient Registration"
2. Select Organ: **KIDNEY**
3. Enter: Full Name (John Doe), Age (50), Gender (Male), Blood Group (O+)
4. Height (180), Weight (85), Contact (555-XXXX), Email, Urgency (High)
5. Hospital: Name (Any Hospital), City, State, Doctor
6. Organ-Specific: recipient_GFR: **25**
7. Complete registration

---

## HEART ORGAN - Test Data

### Heart Donors (10)

| # | Name | Age | Gender | Blood | Phone | Medical: heartFunction |
|---|------|-----|--------|-------|-------|----------------------|
| 1 | George Clark | 35 | Male | A+ | 555-0201 | 52 |
| 2 | Patricia Lewis | 42 | Female | B+ | 555-0202 | 55 |
| 3 | Joseph Lee | 38 | Male | O+ | 555-0203 | 50 |
| 4 | Maria Garcia | 45 | Female | AB+ | 555-0204 | 54 |
| 5 | Thomas Martinez | 40 | Male | O- | 555-0205 | 51 |
| 6 | Jennifer Rodriguez | 37 | Female | A- | 555-0206 | 56 |
| 7 | Charles Wilson | 43 | Male | B- | 555-0207 | 49 |
| 8 | Barbara Anderson | 39 | Female | AB- | 555-0208 | 53 |
| 9 | Daniel Taylor | 44 | Male | A+ | 555-0209 | 52 |
| 10 | Susan Thomas | 36 | Female | B+ | 555-0210 | 55 |

### Heart Recipients (3)

| # | Name | Age | Gender | Blood | Height | Weight | Urgency | Medical: heartFunction |
|---|------|-----|--------|-------|--------|--------|---------|----------------------|
| 1 | Michael Heart | 52 | Male | A+ | 182 | 90 | Critical | 30 |
| 2 | Rachel Carter | 49 | Female | B+ | 168 | 72 | Critical | 28 |
| 3 | William Nelson | 56 | Male | O+ | 178 | 88 | High | 32 |

**Frontend Registration Steps for Heart Donor:**
1. Click "Donor Registration"
2. Enter: Full Name (George Clark), Age (35), Gender (Male), Blood Group (A+), Phone (555-0201)
3. Select Organ: **HEART**
4. Guardian Name (e.g., "Anne Clark"), Relation (Sister), Guardian Phone (555-0211)
5. Check "I consent for post-death heart donation"
6. Check "I agree to AI-based matching..."
7. Proceed to Medical Details
8. Enter heartFunction: **52**
9. Complete registration

**Frontend Registration Steps for Heart Recipient:**
1. Click "Recipient Registration"
2. Select Organ: **HEART**
3. Enter: Full Name (Michael Heart), Age (52), Gender (Male), Blood Group (A+)
4. Height (182), Weight (90), Contact, Email, Urgency (Critical)
5. Hospital Details
6. Organ-Specific: heartFunction: **30**
7. Complete registration

---

## LUNG ORGAN - Test Data

### Lung Donors (10)

| # | Name | Age | Gender | Blood | Phone | Medical: FEV |
|---|------|-----|--------|-------|-------|-------------|
| 1 | Richard Jackson | 48 | Male | O+ | 555-0301 | 78 |
| 2 | Karen Brown | 44 | Female | A+ | 555-0302 | 81 |
| 3 | Paul Jones | 51 | Male | B+ | 555-0303 | 76 |
| 4 | Nancy Davis | 46 | Female | AB+ | 555-0304 | 79 |
| 5 | Mark Williams | 49 | Male | O- | 555-0305 | 77 |
| 6 | Lisa Rodriguez | 43 | Female | A- | 555-0306 | 82 |
| 7 | Donald Miller | 52 | Male | B- | 555-0307 | 75 |
| 8 | Sandra Martinez | 45 | Female | AB- | 555-0308 | 80 |
| 9 | Steven Anderson | 50 | Male | O+ | 555-0309 | 78 |
| 10 | Ashley Taylor | 42 | Female | A+ | 555-0310 | 83 |

### Lung Recipients (3)

| # | Name | Age | Gender | Blood | Height | Weight | Urgency | Medical: FEV |
|---|------|-----|--------|-------|--------|--------|---------|------------|
| 1 | Andrew Lung | 54 | Male | O+ | 180 | 85 | Critical | 42 |
| 2 | Stephanie Grant | 51 | Female | A+ | 166 | 70 | High | 45 |
| 3 | Kevin Foster | 57 | Male | B+ | 176 | 82 | Critical | 41 |

**Frontend Registration Steps for Lung Donor:**
1. Click "Donor Registration"
2. Enter: Full Name (Richard Jackson), Age (48), Gender (Male), Blood Group (O+), Phone (555-0301)
3. Select Organ: **LUNG**
4. Donation Type: **Living** (or Post-death)
5. Check "I agree to AI-based matching..."
6. Proceed to Medical Details
7. Enter FEV: **78**
8. Complete registration

**Frontend Registration Steps for Lung Recipient:**
1. Click "Recipient Registration"
2. Select Organ: **LUNG**
3. Enter: Full Name (Andrew Lung), Age (54), Gender (Male), Blood Group (O+)
4. Height (180), Weight (85), Contact, Email, Urgency (Critical)
5. Hospital Details
6. Organ-Specific: FEV: **42**
7. Complete registration

---

## LIVER ORGAN - Test Data

### Liver Donors (10)

| # | Name | Age | Gender | Blood | Phone | Medical: AST |
|---|------|-----|--------|-------|-------|------------|
| 1 | Kevin Harris | 46 | Male | A+ | 555-0401 | 32 |
| 2 | Donna Clark | 43 | Female | B+ | 555-0402 | 28 |
| 3 | Brian Lewis | 50 | Male | O+ | 555-0403 | 35 |
| 4 | Carol Walker | 44 | Female | AB+ | 555-0404 | 30 |
| 5 | Edward Hall | 48 | Male | O- | 555-0405 | 33 |
| 6 | Dorothy Young | 41 | Female | A- | 555-0406 | 27 |
| 7 | Ronald King | 51 | Male | B- | 555-0407 | 34 |
| 8 | Shirley Scott | 45 | Female | AB- | 555-0408 | 29 |
| 9 | Gary Green | 47 | Male | A+ | 555-0409 | 32 |
| 10 | Janet Adams | 42 | Female | O+ | 555-0410 | 31 |

### Liver Recipients (3)

| # | Name | Age | Gender | Blood | Height | Weight | Urgency | Medical: AST |
|---|------|-----|--------|-------|--------|--------|---------|------------|
| 1 | Justin Liver | 53 | Male | A+ | 181 | 88 | Critical | 42 |
| 2 | Linda Harper | 50 | Female | B+ | 167 | 74 | High | 45 |
| 3 | Ryan Palmer | 56 | Male | O+ | 177 | 86 | Critical | 48 |

**Frontend Registration Steps for Liver Donor:**
1. Click "Donor Registration"
2. Enter: Full Name (Kevin Harris), Age (46), Gender (Male), Blood Group (A+), Phone (555-0401)
3. Select Organ: **LIVER**
4. Check "I consent for living organ donation"
5. Check "I agree to AI-based matching..."
6. Proceed to Medical Details
7. Enter AST: **32**
8. Complete registration

**Frontend Registration Steps for Liver Recipient:**
1. Click "Recipient Registration"
2. Select Organ: **LIVER**
3. Enter: Full Name (Justin Liver), Age (53), Gender (Male), Blood Group (A+)
4. Height (181), Weight (88), Contact, Email, Urgency (Critical)
5. Hospital Details
6. Organ-Specific: AST: **42**
7. Complete registration

---

## Testing Checklist

### Registration Phase
- [ ] Register 10 Kidney Donors
- [ ] Register 3 Kidney Recipients
- [ ] Register 10 Heart Donors
- [ ] Register 3 Heart Recipients
- [ ] Register 10 Lung Donors
- [ ] Register 3 Lung Recipients
- [ ] Register 10 Liver Donors
- [ ] Register 3 Liver Recipients

### Matching Phase
- [ ] Login as Kidney Recipient #1, search matches (should show top 5 kidney donors)
- [ ] Login as Heart Recipient #1, search matches (should show top 5 heart donors)
- [ ] Login as Lung Recipient #1, search matches (should show top 5 lung donors)
- [ ] Login as Liver Recipient #1, search matches (should show top 5 liver donors)

### Verification Checks
- [ ] Match scores are between 0.1 and 0.95
- [ ] Blood type matches get higher scores
- [ ] Age-compatible donors rank higher
- [ ] Medical parameters (GFR/FEV/AST/heartFunction) affect scoring
- [ ] All donors shown are active status
- [ ] All recipients see correct organ type donors
- [ ] Top 5 results sorted by score (highest first)

---

## Quick Email Pattern
For donor/recipient emails, use pattern: 
- Donor: `donorFirstname@kidney.test` 
- Recipient: `recipientFirstname@kidney.test`

Example: `james@kidney.test`, `john@kidney.test`

---

## Expected Matching Behavior

### Kidney Matching Example
- Recipient: John Doe (50, O+, GFR=25)
- Best matches: Donors with O+/A-, age 45-55, GFR > 80

### Heart Matching Example
- Recipient: Michael Heart (52, A+, heartFunction=30)
- Best matches: Donors with A+/AB+, age 35-50, heartFunction > 50

### Lung Matching Example
- Recipient: Andrew Lung (54, O+, FEV=42)
- Best matches: Donors with O+/A-, age 45-55, FEV > 76

### Liver Matching Example
- Recipient: Justin Liver (53, A+, AST=42)
- Best matches: Donors with A+/AB+, age 45-55, AST < 35

---

## Time Saving Tips

1. **Use Copy-Paste**: Copy names/phones from this guide into forms
2. **Same Email Domain**: Use same pattern (firstname@organ.test)
3. **Batch Registration**: Register all donors, then all recipients
4. **Test One Organ First**: Kidney → Verify working → Then other organs
5. **Keep Notes**: Write down passwords used for easy login testing

---

## Database Backup Tip

After registering all data:
```bash
# Export MongoDB for backup
mongodump --db organ_transplant --out ./backups

# Or via MongoDB Compass:
# Select all collections → Export → Save as .json
```

This way you can restore test data if needed!

---

## Next Steps After Data Creation

1. ✅ Register all 40 donors + 12 recipients
2. ✅ Login as each recipient type
3. ✅ Click "Find Matches"
4. ✅ Verify top 5 donors appear
5. ✅ Check match scores and compatibility
6. ✅ Accept a match
7. ✅ Verify match status updates
8. ✅ Check donor removes from available pool

---

Good luck with your testing! 🎉
