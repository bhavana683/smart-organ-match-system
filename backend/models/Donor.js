/*
import mongoose from "mongoose";

const GuardianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relation: { type: String, enum: ["spouse", "parent", "guardian"], required: true },
  phone: { type: String, required: true },
  priority: { type: Number, default: 1 }
});


const KidneySchema = new mongoose.Schema({
  consentGiven: Boolean,
  donationType: { type: String, enum: ["living"] },
  bmi: Number,
  donor_GFR: { type: Number, required: true },
  creatinineLevel: Number,
  dialysisHistory: String
});


const LiverSchema = new mongoose.Schema({
  consentGiven: Boolean,
  donationType: { type: String, enum: ["living"] },
  bmi: Number,

  // Liver donor labs (we will map to STAR feature names)
  tbili: Number,        // -> TBILI_DON_x
  creat: Number,        // -> CREAT_DON_x
  sgot: Number,         // -> SGOT_DON_x
  sgpt: Number,         // -> SGPT_DON_x
  alcoholHeavy: { type: Number, default: 0 } // -> ALCOHOL_HEAVY_DON_x (0/1)
});


const LungSchema = new mongoose.Schema({
  consentGiven: Boolean,
  donationType: { type: String, enum: ["living", "post-death"] },
  pulmonaryDisease: String,
  smokingHistory: String
});


const HeartSchema = new mongoose.Schema({
  consentGiven: Boolean,
  donationType: { type: String, enum: ["post-death"] },
  cardiacConditions: String,
  lastMedicalCheckup: Date
});


const DonorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },     // keep consistent with your saved values
    bloodGroup: { type: String, required: true }, // maps to ABO_DON_x
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    location: { city: String, state: String },

    organs: {
      kidney: { type: KidneySchema, default: null },
      liver: { type: LiverSchema, default: null },
      lung: { type: LungSchema, default: null },
      heart: { type: HeartSchema, default: null }
    },

    guardians: { type: [GuardianSchema], default: [] },

    aiConsent: { type: Boolean, required: true },

    status: {
      type: String,
      enum: ["active", "matched", "completed", "removed"],
      default: "active"
    },

    matchedRecipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipient",
      default: null
    },

    removedFromPoolAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("Donor", DonorSchema);
*/


/*
import mongoose from "mongoose";


const KidneySchema = new mongoose.Schema({
  consentGiven: Boolean,
  donationType: { type: String, enum: ["living"] },
  bmi: Number,
  dialysisHistory: Number,
  creatinineLevel: Number
});

const LiverSchema = new mongoose.Schema({
  consentGiven: Boolean,
  donationType: { type: String, enum: ["living"] },
  bmi: Number,
  totalBilirubin: Number,
  serumCreatinine: Number,
  sgot: Number,
  sgpt: Number,
  alcoholHeavy: Number
});

const HeartSchema = new mongoose.Schema({
  consentGiven: Boolean,
  donationType: { type: String, enum: ["post-death"] },

  bmi: Number,

  // ML Required Fields
  antihype_don: { type: Number, default: 0 },
  alcohol_heavy_don: { type: Number, default: 0 },

  cardiacConditions: String,
  lastMedicalCheckup: Date
});

const LungSchema = new mongoose.Schema({
  consentGiven: Boolean,
  donationType: { type: String, enum: ["living", "post-death"] },
  bmi: Number
});



const DonorSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    age: Number,
    gender: String,
    bloodGroup: String,
    phone: String,
    city: String,
    state: String,

    status: {
      type: String,
      enum: ["active", "completed", "removed"],
      default: "active"
    },

    aiConsent: Boolean,

    organs: {
      kidney: { type: KidneySchema, default: null },
      liver: { type: LiverSchema, default: null },
      heart: { type: HeartSchema, default: null },
      lung: { type: LungSchema, default: null }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Donor", DonorSchema);


*/
import mongoose from "mongoose";

/* =========================
   Organ Schemas
========================= */

const KidneySchema = new mongoose.Schema({
  consentGiven: Boolean,
  donationType: { type: String, enum: ["living"] },
  bmi: Number,
  dialysisHistory: Number,
  creatinineLevel: Number
});

const LiverSchema = new mongoose.Schema({
  consentGiven: Boolean,
  donationType: { type: String, enum: ["living"] },
  bmi: Number,
  totalBilirubin: Number,
  serumCreatinine: Number,
  sgot: Number,
  sgpt: Number,
  alcoholHeavy: Number
});

const HeartSchema = new mongoose.Schema({
  consentGiven: Boolean,
  donationType: { type: String, enum: ["post-death"] },
  bmi: Number,
  antihype_don: Number,
  alcohol_heavy_don: Number,
  cardiacConditions: String
});

/* 🔥 FULL LUNG SCHEMA BASED ON TRAINING FEATURES */
const LungSchema = new mongoose.Schema({
  consentGiven: Boolean,
  donationType: { type: String, enum: ["living", "post-death"] },

  bmi: Number,                    // BMI_DON_CALC_x
  alcoholHeavyDon: Number,        // ALCOHOL_HEAVY_DON_x
  bloodInfectionDon: Number,      // BLOOD_INF_DON_x
  cardiacIndexDon: Number,        // CARD_IDX_INIT_DON_x
  creatinineDon: Number,          // CREAT_DON_x
  cancerSiteDon: String           // CANCER_SITE_DON
});

const DonorSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    age: Number,
    gender: String,
    bloodGroup: String,
    phone: String,
    city: String,
    state: String,

    status: {
      type: String,
      enum: ["active", "assigned", "completed", "removed"],
      default: "active"
    },

    matchedRecipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipient",
      default: null
    },

    aiConsent: Boolean,

    organs: {
      kidney: { type: KidneySchema, default: null },
      liver: { type: LiverSchema, default: null },
      heart: { type: HeartSchema, default: null },
      lung: { type: LungSchema, default: null }
    }
  },
  { timestamps: true }
);

export default mongoose.model("Donor", DonorSchema);