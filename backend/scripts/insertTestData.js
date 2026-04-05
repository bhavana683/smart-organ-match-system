// MongoDB Test Data Insertion Script
// File: backend/scripts/insertTestData.js
// Usage: node scripts/insertTestData.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Donor from "../models/Donor.js";
import Recipient from "../models/Recipient.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/organ_transplant";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

async function clearTestData() {
  try {
    await Donor.deleteMany({ email: { $regex: /@kidney.test|@heart.test|@lung.test|@liver.test/ } });
    await Recipient.deleteMany({ email: { $regex: /@kidney.test|@heart.test|@lung.test|@liver.test/ } });
    console.log("🗑️  Cleared previous test data");
  } catch (error) {
    console.error("Error clearing data:", error.message);
  }
}

// ========== KIDNEY TEST DATA ==========
const kidneyDonors = [
  { fullName: "James Wilson", age: 45, gender: "Male", bloodGroup: "O+", phone: "555-0101", email: "james@kidney.test", organs: { kidney: { donor_GFR: 95 } }, status: "active" },
  { fullName: "Sarah Johnson", age: 38, gender: "Female", bloodGroup: "A+", phone: "555-0102", email: "sarah@kidney.test", organs: { kidney: { donor_GFR: 92 } }, status: "active" },
  { fullName: "Michael Brown", age: 52, gender: "Male", bloodGroup: "B+", phone: "555-0103", email: "michael@kidney.test", organs: { kidney: { donor_GFR: 88 } }, status: "active" },
  { fullName: "Emily Davis", age: 41, gender: "Female", bloodGroup: "O-", phone: "555-0104", email: "emily@kidney.test", organs: { kidney: { donor_GFR: 96 } }, status: "active" },
  { fullName: "Robert Miller", age: 49, gender: "Male", bloodGroup: "AB+", phone: "555-0105", email: "robert@kidney.test", organs: { kidney: { donor_GFR: 85 } }, status: "active" },
  { fullName: "Jessica Taylor", age: 36, gender: "Female", bloodGroup: "B-", phone: "555-0106", email: "jessica@kidney.test", organs: { kidney: { donor_GFR: 98 } }, status: "active" },
  { fullName: "David Anderson", age: 47, gender: "Male", bloodGroup: "A-", phone: "555-0107", email: "david@kidney.test", organs: { kidney: { donor_GFR: 90 } }, status: "active" },
  { fullName: "Amanda White", age: 44, gender: "Female", bloodGroup: "AB-", phone: "555-0108", email: "amanda@kidney.test", organs: { kidney: { donor_GFR: 93 } }, status: "active" },
  { fullName: "Christopher Martin", age: 50, gender: "Male", bloodGroup: "O+", phone: "555-0109", email: "christopher@kidney.test", organs: { kidney: { donor_GFR: 87 } }, status: "active" },
  { fullName: "Elizabeth Thompson", age: 39, gender: "Female", bloodGroup: "A+", phone: "555-0110", email: "elizabeth@kidney.test", organs: { kidney: { donor_GFR: 94 } }, status: "active" },
];

const kidneyRecipients = [
  { fullName: "John Doe", age: 50, gender: "Male", bloodGroup: "O+", height: 180, weight: 85, bmi: 26.2, contactNumber: "555-0111", email: "john@kidney.test", organNeeded: "kidney", organSpecificData: { recipient_GFR: 25 }, urgencyLevel: "high", status: "waiting", consent: true, hospital: { name: "City General Hospital", city: "New York", state: "NY", doctorName: "Dr. Smith" } },
  { fullName: "Mary Smith", age: 48, gender: "Female", bloodGroup: "A+", height: 165, weight: 68, bmi: 25.0, contactNumber: "555-0112", email: "mary@kidney.test", organNeeded: "kidney", organSpecificData: { recipient_GFR: 20 }, urgencyLevel: "critical", status: "waiting", consent: true, hospital: { name: "City General Hospital", city: "New York", state: "NY", doctorName: "Dr. Johnson" } },
  { fullName: "Peter Johnson", age: 55, gender: "Male", bloodGroup: "B+", height: 175, weight: 80, bmi: 26.1, contactNumber: "555-0113", email: "peter@kidney.test", organNeeded: "kidney", organSpecificData: { recipient_GFR: 28 }, urgencyLevel: "high", status: "waiting", consent: true, hospital: { name: "City General Hospital", city: "New York", state: "NY", doctorName: "Dr. Williams" } },
];

// ========== HEART TEST DATA ==========
const heartDonors = [
  { fullName: "George Clark", age: 35, gender: "Male", bloodGroup: "A+", phone: "555-0201", email: "george@heart.test", organs: { heart: { heartFunction: 52 } }, status: "active" },
  { fullName: "Patricia Lewis", age: 42, gender: "Female", bloodGroup: "B+", phone: "555-0202", email: "patricia@heart.test", organs: { heart: { heartFunction: 55 } }, status: "active" },
  { fullName: "Joseph Lee", age: 38, gender: "Male", bloodGroup: "O+", phone: "555-0203", email: "joseph@heart.test", organs: { heart: { heartFunction: 50 } }, status: "active" },
  { fullName: "Maria Garcia", age: 45, gender: "Female", bloodGroup: "AB+", phone: "555-0204", email: "maria@heart.test", organs: { heart: { heartFunction: 54 } }, status: "active" },
  { fullName: "Thomas Martinez", age: 40, gender: "Male", bloodGroup: "O-", phone: "555-0205", email: "thomas@heart.test", organs: { heart: { heartFunction: 51 } }, status: "active" },
  { fullName: "Jennifer Rodriguez", age: 37, gender: "Female", bloodGroup: "A-", phone: "555-0206", email: "jennifer@heart.test", organs: { heart: { heartFunction: 56 } }, status: "active" },
  { fullName: "Charles Wilson", age: 43, gender: "Male", bloodGroup: "B-", phone: "555-0207", email: "charles@heart.test", organs: { heart: { heartFunction: 49 } }, status: "active" },
  { fullName: "Barbara Anderson", age: 39, gender: "Female", bloodGroup: "AB-", phone: "555-0208", email: "barbara@heart.test", organs: { heart: { heartFunction: 53 } }, status: "active" },
  { fullName: "Daniel Taylor", age: 44, gender: "Male", bloodGroup: "A+", phone: "555-0209", email: "daniel@heart.test", organs: { heart: { heartFunction: 52 } }, status: "active" },
  { fullName: "Susan Thomas", age: 36, gender: "Female", bloodGroup: "B+", phone: "555-0210", email: "susan@heart.test", organs: { heart: { heartFunction: 55 } }, status: "active" },
];

const heartRecipients = [
  { fullName: "Michael Heart", age: 52, gender: "Male", bloodGroup: "A+", height: 182, weight: 90, bmi: 27.1, contactNumber: "555-0211", email: "michael@heart.test", organNeeded: "heart", organSpecificData: { heartFunction: 30 }, urgencyLevel: "critical", status: "waiting", consent: true, hospital: { name: "City General Hospital", city: "New York", state: "NY", doctorName: "Dr. Brown" } },
  { fullName: "Rachel Carter", age: 49, gender: "Female", bloodGroup: "B+", height: 168, weight: 72, bmi: 25.5, contactNumber: "555-0212", email: "rachel@heart.test", organNeeded: "heart", organSpecificData: { heartFunction: 28 }, urgencyLevel: "critical", status: "waiting", consent: true, hospital: { name: "City General Hospital", city: "New York", state: "NY", doctorName: "Dr. Davis" } },
  { fullName: "William Nelson", age: 56, gender: "Male", bloodGroup: "O+", height: 178, weight: 88, bmi: 27.8, contactNumber: "555-0213", email: "william@heart.test", organNeeded: "heart", organSpecificData: { heartFunction: 32 }, urgencyLevel: "high", status: "waiting", consent: true, hospital: { name: "City General Hospital", city: "New York", state: "NY", doctorName: "Dr. Miller" } },
];

// ========== LUNG TEST DATA ==========
const lungDonors = [
  { fullName: "Richard Jackson", age: 48, gender: "Male", bloodGroup: "O+", phone: "555-0301", email: "richard@lung.test", organs: { lung: { FEV: 78 } }, status: "active" },
  { fullName: "Karen Brown", age: 44, gender: "Female", bloodGroup: "A+", phone: "555-0302", email: "karen@lung.test", organs: { lung: { FEV: 81 } }, status: "active" },
  { fullName: "Paul Jones", age: 51, gender: "Male", bloodGroup: "B+", phone: "555-0303", email: "paul@lung.test", organs: { lung: { FEV: 76 } }, status: "active" },
  { fullName: "Nancy Davis", age: 46, gender: "Female", bloodGroup: "AB+", phone: "555-0304", email: "nancy@lung.test", organs: { lung: { FEV: 79 } }, status: "active" },
  { fullName: "Mark Williams", age: 49, gender: "Male", bloodGroup: "O-", phone: "555-0305", email: "mark@lung.test", organs: { lung: { FEV: 77 } }, status: "active" },
  { fullName: "Lisa Rodriguez", age: 43, gender: "Female", bloodGroup: "A-", phone: "555-0306", email: "lisa@lung.test", organs: { lung: { FEV: 82 } }, status: "active" },
  { fullName: "Donald Miller", age: 52, gender: "Male", bloodGroup: "B-", phone: "555-0307", email: "donald@lung.test", organs: { lung: { FEV: 75 } }, status: "active" },
  { fullName: "Sandra Martinez", age: 45, gender: "Female", bloodGroup: "AB-", phone: "555-0308", email: "sandra@lung.test", organs: { lung: { FEV: 80 } }, status: "active" },
  { fullName: "Steven Anderson", age: 50, gender: "Male", bloodGroup: "O+", phone: "555-0309", email: "steven@lung.test", organs: { lung: { FEV: 78 } }, status: "active" },
  { fullName: "Ashley Taylor", age: 42, gender: "Female", bloodGroup: "A+", phone: "555-0310", email: "ashley@lung.test", organs: { lung: { FEV: 83 } }, status: "active" },
];

const lungRecipients = [
  { fullName: "Andrew Lung", age: 54, gender: "Male", bloodGroup: "O+", height: 180, weight: 85, bmi: 26.2, contactNumber: "555-0311", email: "andrew@lung.test", organNeeded: "lung", organSpecificData: { FEV: 42 }, urgencyLevel: "critical", status: "waiting", consent: true, hospital: { name: "City General Hospital", city: "New York", state: "NY", doctorName: "Dr. Wilson" } },
  { fullName: "Stephanie Grant", age: 51, gender: "Female", bloodGroup: "A+", height: 166, weight: 70, bmi: 25.4, contactNumber: "555-0312", email: "stephanie@lung.test", organNeeded: "lung", organSpecificData: { FEV: 45 }, urgencyLevel: "high", status: "waiting", consent: true, hospital: { name: "City General Hospital", city: "New York", state: "NY", doctorName: "Dr. Garcia" } },
  { fullName: "Kevin Foster", age: 57, gender: "Male", bloodGroup: "B+", height: 176, weight: 82, bmi: 26.5, contactNumber: "555-0313", email: "kevin@lung.test", organNeeded: "lung", organSpecificData: { FEV: 41 }, urgencyLevel: "critical", status: "waiting", consent: true, hospital: { name: "City General Hospital", city: "New York", state: "NY", doctorName: "Dr. Lee" } },
];

// ========== LIVER TEST DATA ==========
const liverDonors = [
  { fullName: "Kevin Harris", age: 46, gender: "Male", bloodGroup: "A+", phone: "555-0401", email: "kevin@liver.test", organs: { liver: { AST: 32 } }, status: "active" },
  { fullName: "Donna Clark", age: 43, gender: "Female", bloodGroup: "B+", phone: "555-0402", email: "donna@liver.test", organs: { liver: { AST: 28 } }, status: "active" },
  { fullName: "Brian Lewis", age: 50, gender: "Male", bloodGroup: "O+", phone: "555-0403", email: "brian@liver.test", organs: { liver: { AST: 35 } }, status: "active" },
  { fullName: "Carol Walker", age: 44, gender: "Female", bloodGroup: "AB+", phone: "555-0404", email: "carol@liver.test", organs: { liver: { AST: 30 } }, status: "active" },
  { fullName: "Edward Hall", age: 48, gender: "Male", bloodGroup: "O-", phone: "555-0405", email: "edward@liver.test", organs: { liver: { AST: 33 } }, status: "active" },
  { fullName: "Dorothy Young", age: 41, gender: "Female", bloodGroup: "A-", phone: "555-0406", email: "dorothy@liver.test", organs: { liver: { AST: 27 } }, status: "active" },
  { fullName: "Ronald King", age: 51, gender: "Male", bloodGroup: "B-", phone: "555-0407", email: "ronald@liver.test", organs: { liver: { AST: 34 } }, status: "active" },
  { fullName: "Shirley Scott", age: 45, gender: "Female", bloodGroup: "AB-", phone: "555-0408", email: "shirley@liver.test", organs: { liver: { AST: 29 } }, status: "active" },
  { fullName: "Gary Green", age: 47, gender: "Male", bloodGroup: "A+", phone: "555-0409", email: "gary@liver.test", organs: { liver: { AST: 32 } }, status: "active" },
  { fullName: "Janet Adams", age: 42, gender: "Female", bloodGroup: "O+", phone: "555-0410", email: "janet@liver.test", organs: { liver: { AST: 31 } }, status: "active" },
];

const liverRecipients = [
  { fullName: "Justin Liver", age: 53, gender: "Male", bloodGroup: "A+", height: 181, weight: 88, bmi: 26.9, contactNumber: "555-0411", email: "justin@liver.test", organNeeded: "liver", organSpecificData: { AST: 42 }, urgencyLevel: "critical", status: "waiting", consent: true, hospital: { name: "City General Hospital", city: "New York", state: "NY", doctorName: "Dr. Taylor" } },
  { fullName: "Linda Harper", age: 50, gender: "Female", bloodGroup: "B+", height: 167, weight: 74, bmi: 26.6, contactNumber: "555-0412", email: "linda@liver.test", organNeeded: "liver", organSpecificData: { AST: 45 }, urgencyLevel: "high", status: "waiting", consent: true, hospital: { name: "City General Hospital", city: "New York", state: "NY", doctorName: "Dr. Anderson" } },
  { fullName: "Ryan Palmer", age: 56, gender: "Male", bloodGroup: "O+", height: 177, weight: 86, bmi: 27.5, contactNumber: "555-0413", email: "ryan@liver.test", organNeeded: "liver", organSpecificData: { AST: 48 }, urgencyLevel: "critical", status: "waiting", consent: true, hospital: { name: "City General Hospital", city: "New York", state: "NY", doctorName: "Dr. Thomas" } },
];

async function insertData() {
  try {
    const defaultPassword = await bcrypt.hash("Test@123", 10);

    // Insert all donors with password and aiConsent
    const donors = [
      ...kidneyDonors.map(d => ({ ...d, password: defaultPassword, aiConsent: true })),
      ...heartDonors.map(d => ({ ...d, password: defaultPassword, aiConsent: true })),
      ...lungDonors.map(d => ({ ...d, password: defaultPassword, aiConsent: true })),
      ...liverDonors.map(d => ({ ...d, password: defaultPassword, aiConsent: true })),
    ];

    await Donor.insertMany(donors);
    console.log(`✅ Inserted ${donors.length} donors`);

    // Insert all recipients with password and consent
    const recipients = [
      ...kidneyRecipients.map(r => ({ ...r, password: defaultPassword })),
      ...heartRecipients.map(r => ({ ...r, password: defaultPassword })),
      ...lungRecipients.map(r => ({ ...r, password: defaultPassword })),
      ...liverRecipients.map(r => ({ ...r, password: defaultPassword })),
    ];

    await Recipient.insertMany(recipients);
    console.log(`✅ Inserted ${recipients.length} recipients`);

    console.log("\n📊 Test Data Summary:");
    console.log("✅ 10 Kidney Donors + 3 Recipients");
    console.log("✅ 10 Heart Donors + 3 Recipients");
    console.log("✅ 10 Lung Donors + 3 Recipients");
    console.log("✅ 10 Liver Donors + 3 Recipients");
    console.log("\n🔑 Login Password for all: Test@123");
    console.log("\n🚀 Test data ready! Start your frontend and test matching.");

  } catch (error) {
    console.error("❌ Error inserting data:", error.message);
  }
}

async function main() {
  await connectDB();
  await clearTestData();
  await insertData();
  await mongoose.connection.close();
  console.log("\n✅ Script completed");
}

main().catch(console.error);
