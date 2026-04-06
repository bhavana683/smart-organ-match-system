/*

import axios from "axios";
import Donor from "../models/Donor.js";
import Recipient from "../models/Recipient.js";


export const findMatches = async (req, res) => {
  try {
    const recipient = await Recipient.findById(req.user.id);
    if (!recipient) return res.status(404).json({ message: "Recipient not found" });

    const organNeeded = (recipient.organNeeded || "").toLowerCase();
    if (!["kidney", "liver", "heart"].includes(organNeeded)) {
      return res.status(400).json({ message: "Only kidney, liver, and heart are enabled now" });
    }

    const donors = await Donor.find({
      status: "active",
      [`organs.${organNeeded}`]: { $ne: null }
    });

    if (!donors.length) {
      return res.json({
        success: true,
        recipient: {
          fullName: recipient.fullName,
          organNeeded: organNeeded,
          age: recipient.age,
          bloodGroup: recipient.bloodGroup
        },
        totalMatches: 0,
        matches: []
      });
    }

    const matchResults = [];

    for (const donor of donors) {
      const organData = donor.organs[organNeeded];
      if (!organData) continue;

      let mlPayload = {};

      
      if (organNeeded === "kidney") {
        const donor_age = donor.age;
        const recipient_age = recipient.age;

        const donor_GFR = organData.donor_GFR;
        const recipient_GFR = Number(recipient.organSpecificData?.recipient_GFR);

        const viral_infection = 0;
        const prior_transplant = 0;

        const age_diff = donor_age - recipient_age;
        const gfr_diff = donor_GFR - recipient_GFR;
        const high_risk = viral_infection + prior_transplant;

        mlPayload = {
          donor_age,
          recipient_age,
          donor_GFR,
          recipient_GFR,
          viral_infection,
          prior_transplant,
          age_diff,
          gfr_diff,
          high_risk,
          donor_gender: donor.gender,
          recipient_gender: recipient.gender,
          donor_blood_type: donor.bloodGroup,
          recipient_blood_type: recipient.bloodGroup
        };
      }

      
      if (organNeeded === "liver") {
        mlPayload = {
          // recipient
          AGE: recipient.age,
          GENDER: recipient.gender,
          ABO: recipient.bloodGroup,

          INIT_BILIRUBIN: Number(recipient.organSpecificData?.init_bilirubin),
          INIT_INR: Number(recipient.organSpecificData?.init_inr),
          INIT_SERUM_CREAT: Number(recipient.organSpecificData?.init_serum_creat),
          INIT_ALBUMIN: recipient.organSpecificData?.init_albumin === "" ? null : Number(recipient.organSpecificData?.init_albumin),
          MELD_PELD_LAB_SCORE: recipient.organSpecificData?.meld_peld_lab_score === "" ? null : Number(recipient.organSpecificData?.meld_peld_lab_score),
          DIS_SGOT: recipient.organSpecificData?.dis_sgot === "" ? null : Number(recipient.organSpecificData?.dis_sgot),

          // donor (suffix _DON_x as in training columns)
          AGE_DON_x: donor.age,
          GENDER_DON_x: donor.gender,
          ABO_DON_x: donor.bloodGroup,

          TBILI_DON_x: organData.tbili ?? null,
          CREAT_DON_x: organData.creat ?? null,
          SGOT_DON_x: organData.sgot ?? null,
          SGPT_DON_x: organData.sgpt ?? null,
          ALCOHOL_HEAVY_DON_x: organData.alcoholHeavy ?? 0
        };
      }

      // Call correct organ endpoint
      const response = await axios.post(
        `http://localhost:5001/predict/${organNeeded}`,
        mlPayload
      );

      const locationString = donor.location
        ? `${donor.location.city || ""}${donor.location.city && donor.location.state ? ", " : ""}${donor.location.state || ""}`.trim()
        : "Not provided";

      matchResults.push({
        donorId: donor._id,
        fullName: donor.fullName,
        age: donor.age,
        gender: donor.gender,
        bloodGroup: donor.bloodGroup,
        phone: donor.phone,
        location: locationString || "N/A",
        matchScore: response.data.match_probability
      });
    }

    matchResults.sort((a, b) => b.matchScore - a.matchScore);

    return res.json({
      success: true,
      organ: organNeeded,
      recipient: {
        fullName: recipient.fullName,
        organNeeded,
        age: recipient.age,
        bloodGroup: recipient.bloodGroup
      },
      totalMatches: matchResults.length,
      matches: matchResults.slice(0, 5)
    });

  } catch (error) {
    console.error("Matching error:", error.message);
    return res.status(500).json({ message: "Matching failed" });
  }
};


export const acceptMatch = async (req, res) => {
  try {
    const { donorId } = req.body;
    const recipientId = req.user.id;

    await Donor.findByIdAndUpdate(donorId, {
      status: "completed",
      matchedRecipientId: recipientId,
      removedFromPoolAt: new Date()
    });

    await Recipient.findByIdAndUpdate(recipientId, {
      status: "approved"
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

*/



/*
import Recipient from "../models/Recipient.js";
import Donor from "../models/Donor.js";
import axios from "axios";

const getHeuristicMatchScore = (donor, recipient, organNeeded) => {
  const donorBlood = (donor.bloodGroup || "").toUpperCase();
  const recipientBlood = (recipient.bloodGroup || "").toUpperCase();
  const bloodTypeMatch = donorBlood === recipientBlood ? 0.35 : 0.15;
  const ageDiff = Math.abs((donor.age || 40) - (recipient.age || 50));
  const ageCompatibility = 1.0 - Math.min(ageDiff / 50, 1.0);

  let score = 0.5;
  if (organNeeded === "kidney") {
    const donorGfr = Number(donor.organs?.kidney?.donor_GFR || 80);
    const recipientGfr = Number(recipient.organSpecificData?.recipient_GFR || 30);
    const gfrCompatibility = 1.0 - Math.min(Math.abs(donorGfr - recipientGfr) / 100, 1.0);
    score = bloodTypeMatch * 0.3 + ageCompatibility * 0.3 + gfrCompatibility * 0.4;
  } else if (organNeeded === "heart") {
    const riskFactor = 0.5;
    score = bloodTypeMatch * 0.4 + ageCompatibility * 0.4 + riskFactor * 0.2;
  } else if (organNeeded === "lung") {
    score = bloodTypeMatch * 0.3 + ageCompatibility * 0.35 + 0.3 * 0.35;
  } else if (organNeeded === "liver") {
    score = bloodTypeMatch * 0.35 + ageCompatibility * 0.35 + 0.3 * 0.3;
  }

  return Math.max(0.1, Math.min(score, 0.95));
};



export const findMatches = async (req, res) => {
  try {
    const recipient = await Recipient.findById(req.user.id);
    if (!recipient)
      return res.status(404).json({ message: "Recipient not found" });

    const organNeeded = (recipient.organNeeded || "").toLowerCase();
    if (!["kidney", "liver", "heart", "lung"].includes(organNeeded)) {
      return res.status(400).json({ message: "Organ type currently not supported for matching" });
    }

    const donors = await Donor.find({
      [`organs.${organNeeded}`]: { $ne: null },
      status: "active"
    });

    const matches = [];

    for (const donor of donors) {
      const organData = donor.organs[organNeeded];
      let mlPayload = {
        donor_age: donor.age,
        recipient_age: recipient.age,
        age_diff: (donor.age || 0) - (recipient.age || 0),
        donor_blood_type: donor.bloodGroup,
        recipient_blood_type: recipient.bloodGroup,
        donor_gender: donor.gender,
        recipient_gender: recipient.gender,
        organ_type: organNeeded,
        viral_infection: 0,
        prior_transplant: 0,
        high_risk: 0
      };

      if (organNeeded === "kidney") {
        const donorGfr = Number(organData?.donor_GFR || 80);
        const recipientGfr = Number(recipient.organSpecificData?.recipient_GFR || 30);
        mlPayload = {
          ...mlPayload,
          donor_GFR: donorGfr,
          recipient_GFR: recipientGfr,
          gfr_diff: donorGfr - recipientGfr
        };
      }

      // For other organs we still have age/blood as core features
      const mlApiUrl = "http://localhost:5001/predict";

      let matchScore = 0.5;
      try {
        const response = await axios.post(mlApiUrl, mlPayload, { timeout: 7000 });

        if (response.status === 200 && response.data?.match_probability != null) {
          matchScore = Number(response.data.match_probability);
        } else {
          matchScore = getHeuristicMatchScore(donor, recipient, organNeeded);
        }
      } catch (predictErr) {
        const statusCode = predictErr.response?.status;
        if (statusCode === 404) {
          console.warn("ML predict endpoint not found (404). Using heuristic fallback.");
        } else if (statusCode) {
          console.warn(`ML predict API error ${statusCode}: ${predictErr.response?.data?.message || predictErr.message}`);
        } else {
          console.warn(`ML predict API error: ${predictErr.message}`);
        }

        matchScore = getHeuristicMatchScore(donor, recipient, organNeeded);
      }

      matches.push({
        donorId: donor._id,
        fullName: donor.fullName,
        phone: donor.phone,
        city: donor.city,
        state: donor.state,
        matchScore
      });
    }

    matches.sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      success: true,
      recipient: {
        fullName: recipient.fullName,
        organNeeded: recipient.organNeeded,
        age: recipient.age,
        bloodGroup: recipient.bloodGroup,
      },
      totalMatches: matches.length,
      matches: matches.slice(0, 5)
    });
  } catch (error) {
    console.error("findMatches internal error:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data || null,
      userId: req.user?.id
    });

    res.status(500).json({
      success: false,
      message: "Matching failed",
      error: error.message,
      details: error.response?.data || null
    });
  }
};



export const acceptMatch = async (req, res) => {
  const { donorId } = req.body;

  try {
    const recipient = await Recipient.findById(req.user.id);
    const donor = await Donor.findById(donorId);

    if (!recipient || !donor)
      return res.status(404).json({ message: "Invalid donor/recipient" });

    donor.status = "completed";
    recipient.status = "approved";

    await donor.save();
    await recipient.save();

    res.json({ success: true, message: "Match accepted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/


import Recipient from "../models/Recipient.js";
import Donor from "../models/Donor.js";
import Transaction from "../models/Transaction.js";
import axios from "axios";

const getHeuristicMatchScore = (donor, recipient, organNeeded) => {
  const donorBlood = (donor.bloodGroup || "").toUpperCase();
  const recipientBlood = (recipient.bloodGroup || "").toUpperCase();
  const bloodMatchScore = donorBlood === recipientBlood ? 0.35 : 0.15;
  const ageDiff = Math.min(Math.abs((donor.age || 40) - (recipient.age || 50)), 100);
  const ageScore = 1 - ageDiff / 100;

  let score = 0.5;

  if (organNeeded === "kidney") {
    const donorGfr = Number(donor.organs?.kidney?.donor_GFR ?? donor.organs?.kidney?.creatinineLevel ?? 80);
    const recipientGfr = Number(recipient.organSpecificData?.recipient_GFR ?? recipient.organSpecificData?.creatinineLevel ?? 30);
    const gfrScore = 1 - Math.min(Math.abs(donorGfr - recipientGfr) / 100, 1);
    score = bloodMatchScore * 0.3 + ageScore * 0.3 + gfrScore * 0.4;
  } else if (organNeeded === "heart") {
    score = bloodMatchScore * 0.35 + ageScore * 0.35 + 0.3 * 0.3;
  } else if (organNeeded === "liver") {
    score = bloodMatchScore * 0.35 + ageScore * 0.30 + 0.35 * 0.35;
  } else if (organNeeded === "lung") {
    score = bloodMatchScore * 0.3 + ageScore * 0.35 + 0.3 * 0.35;
  }

  return Math.max(0.1, Math.min(score, 0.95));
};

/* =====================================================
   FIND MATCHES (All Organs Supported)
===================================================== */

export const findMatches = async (req, res) => {
  try {
    const recipient = await Recipient.findById(req.user.id);

    if (!recipient) {
      return res.status(404).json({
        success: false,
        message: "Recipient not found"
      });
    }

    const organNeeded = (recipient.organNeeded || "").toLowerCase();
    const supportedOrgans = ["kidney", "liver", "heart", "lung"];

    if (!supportedOrgans.includes(organNeeded)) {
      return res.status(400).json({
        success: false,
        message: "Organ type currently not supported for matching"
      });
    }

    // Fetch only donors having that organ and active
    const donors = await Donor.find({
      [`organs.${organNeeded}`]: { $ne: null },
      status: "active"
    });

    if (!donors.length) {
      return res.json({
        success: true,
        matches: []
      });
    }

    const mlBaseUrl = process.env.ML_SERVICE_URL || "https://smart-organ-match-system-1.onrender.com";
    const matches = [];

    for (const donor of donors) {
      const organData = donor.organs[organNeeded];
      if (!organData) continue;

      let mlPayload = {};
      let matchScore = 0.5;

      /* =======================
         KIDNEY
      ======================== */
      if (organNeeded === "kidney") {
        mlPayload = {
          donor_age: donor.age,
          donor_blood_type: donor.bloodGroup,
          donor_GFR: organData?.donor_GFR ?? organData?.creatinineLevel,
          donor_gender: donor.gender,

          recipient_age: recipient.age,
          recipient_blood_type: recipient.bloodGroup,
          recipient_GFR: recipient.organSpecificData?.recipient_GFR ?? recipient.organSpecificData?.creatinineLevel,
          recipient_gender: recipient.gender,
          viral_infection: 0,
          prior_transplant: 0
        };
      }

      /* =======================
         LIVER
      ======================== */
      if (organNeeded === "liver") {
        mlPayload = {
          AGE: recipient.age,
          BMI_CALC: recipient.bmi,
          ABO: recipient.bloodGroup,
          MELD_SCORE: recipient.organSpecificData?.meldScore,
          BILIRUBIN: recipient.organSpecificData?.bilirubin,

          AGE_DON: donor.age,
          BMI_DON_CALC: organData?.bmi,
          ABO_DON: donor.bloodGroup,
          ALCOHOL_HEAVY_DON: organData?.alcoholHeavy
        };
      }

      /* =======================
         HEART
      ======================== */
      if (organNeeded === "heart") {
        mlPayload = {
          AGE: recipient.age,
          ABO: recipient.bloodGroup,
          BMI_CALC: recipient.bmi,
          FUNC_STAT_TCR: recipient.organSpecificData?.funcStat,
          INIT_STAT: recipient.organSpecificData?.initStat,

          AGE_DON: donor.age,
          ABO_DON: donor.bloodGroup,
          BMI_DON_CALC: organData?.bmi,
          ANTIHYPE_DON: organData?.antihype_don,
          ALCOHOL_HEAVY_DON: organData?.alcohol_heavy_don
        };
      }

      /* =======================
         🔥 LUNG (FULL ML)
      ======================== */
      if (organNeeded === "lung") {
        mlPayload = {
          AGE: recipient.age,
          BMI_CALC: recipient.bmi,
          ABO: recipient.bloodGroup,
          BIOPSY_DGN: recipient.organSpecificData?.BIOPSY_DGN,
          ONVENT: Number(recipient.organSpecificData?.ONVENT),
          ECMO_TCR: Number(recipient.organSpecificData?.ECMO_TCR),
          INIT_CREAT: Number(recipient.organSpecificData?.INIT_CREAT),
          HEMO_PA_MN_TCR: Number(recipient.organSpecificData?.HEMO_PA_MN_TCR),
          DIAB: Number(recipient.organSpecificData?.DIAB),

          AGE_DON_x: donor.age,
          BMI_DON_CALC_x: organData?.bmi,
          ABO_DON_x: donor.bloodGroup,
          ALCOHOL_HEAVY_DON_x: organData?.alcoholHeavyDon,
          BLOOD_INF_DON_x: organData?.bloodInfectionDon,
          CARD_IDX_INIT_DON_x: organData?.cardiacIndexDon,
          CREAT_DON_x: organData?.creatinineDon,
          CANCER_SITE_DON: organData?.cancerSiteDon
        };
      }

      try {
        const response = await axios.post(
          `${mlBaseUrl}/predict/${organNeeded}`,
          mlPayload,
          { timeout: 7000 }
        );

        if (response?.data?.match_probability != null) {
          matchScore = Number(response.data.match_probability);
        } else {
          throw new Error("ML response missing match_probability");
        }
      } catch (error) {
        console.error(
          `ML scoring failed for donor ${donor._id} organ ${organNeeded}:`,
          error.response?.data || error.message || error
        );
        matchScore = getHeuristicMatchScore(donor, recipient, organNeeded);
      }

      matches.push({
        donorId: donor._id,
        fullName: donor.fullName,
        email: donor.email,
        phone: donor.phone,
        city: donor.city,
        state: donor.state,
        matchScore
      });
    }

    // Sort highest score first
    matches.sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      success: true,
      matches: matches.slice(0, 5)
    });

  } catch (error) {
    console.error("Match error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =====================================================
   ACCEPT MATCH
===================================================== */

export const acceptMatch = async (req, res) => {
  try {
    const { donorId } = req.body;

    const recipient = await Recipient.findById(req.user.id);
    const donor = await Donor.findById(donorId);

    if (!recipient || !donor) {
      return res.status(404).json({
        success: false,
        message: "Donor or Recipient not found"
      });
    }

    if (donor.status === "assigned" && donor.matchedRecipientId?.toString() === recipient._id.toString()) {
      // already assigned to this recipient, nothing else to do
      return res.json({ success: true, message: "Donor already assigned to you" });
    }

    if (donor.status !== "active") {
      return res.status(400).json({ success: false, message: "Donor not available for assignment" });
    }

    donor.status = "assigned";
    donor.matchedRecipientId = recipient._id;
    recipient.status = "donor_found";
    recipient.matchedDonorId = donor._id;

    await donor.save();
    await recipient.save();

    res.json({ success: true, message: "Donor assigned and waiting for confirmation" });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const startChatAndAssignDraft = async (req, res) => {
  try {
    const { donorId } = req.body;
    const recipient = await Recipient.findById(req.user.id);
    const donor = await Donor.findById(donorId);

    if (!recipient || !donor) {
      return res.status(404).json({ success: false, message: "Donor or recipient not found" });
    }

    if (donor.status !== "active") {
      if (donor.status === "assigned" && donor.matchedRecipientId?.toString() === recipient._id.toString()) {
        // Already assigned to this recipient, proceed
      } else {
        return res.status(400).json({ success: false, message: "Donor is not available for assignment" });
      }
    }

    donor.status = "assigned";
    donor.matchedRecipientId = recipient._id;

    recipient.status = "donor_found";
    recipient.matchedDonorId = donor._id;

    const transaction = await Transaction.create({
      donorId: donor._id,
      recipientId: recipient._id,
      organType: recipient.organNeeded,
      status: "chatting",
      chatHistory: [
        { sender: "recipient", message: "Hello, I am your matched recipient. Can we proceed with organ transplant?" }
      ],
      assignedAt: new Date()
    });

    await donor.save();
    await recipient.save();

    res.json({
      success: true,
      transactionId: transaction._id,
      donorId: donor._id,
      recipientId: recipient._id,
      donor: {
        donorId: donor._id,
        fullName: donor.fullName,
        age: donor.age,
        bloodGroup: donor.bloodGroup,
        phone: donor.phone
      },
      recipient: {
        recipientId: recipient._id,
        fullName: recipient.fullName,
        status: recipient.status
      },
      message: "Chat started and donor assigned for confirmation"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateChat = async (req, res) => {
  try {
    const { transactionId, sender, message } = req.body;
    if (!transactionId || !sender || !message) {
      return res.status(400).json({ success: false, message: "transactionId, sender and message are required" });
    }

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    transaction.chatHistory.push({ sender, message });
    await transaction.save();

    res.json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const confirmTransplant = async (req, res) => {
  try {
    const { donorId, transactionId } = req.body;
    const recipient = await Recipient.findById(req.user.id);
    const donor = await Donor.findById(donorId);
    const transaction = await Transaction.findById(transactionId);

    if (!recipient || !donor || !transaction) {
      return res.status(404).json({ success: false, message: "Missing donor, recipient, or transaction" });
    }

    if (donor.matchedRecipientId?.toString() !== recipient._id.toString() || donor.status !== "assigned") {
      return res.status(400).json({ success: false, message: "Donor is not in assigned state for this recipient" });
    }

    donor.status = "completed";
    recipient.status = "approved";

    transaction.status = "confirmed";
    transaction.completedAt = new Date();
    transaction.chatHistory.push({ sender: "system", message: "Transplant confirmed by both recipient and donor" });

    await donor.save();
    await recipient.save();
    await transaction.save();

    res.json({ success: true, message: "Transplant confirmed", donor, recipient, transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};