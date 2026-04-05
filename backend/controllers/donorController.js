/*
import Donor from "../models/Donor.js";

export const registerDonor = async (req, res) => {
  if (!Array.isArray(req.body.organs)) {
  return res.status(400).json({ message: "Organs must be an array" });
}
else{
  res.status(200).json({ message: "Organs array validated successfully" });
}
console.log("organs type:",typeof req.body.organs)
console.log("ORGANS TYPE:", typeof req.body.organs);
console.log("IS ARRAY:", Array.isArray(req.body.organs));
console.log("ORGANS VALUE:", req.body.organs);

  const donor = await Donor.create({
    ...req.body,
    aiConsent: true
  });

  res.json(donor);
};

export const getDonorDashboard = async (req, res) => {
  const donor = await Donor.findOne({ email: req.user.email });
  res.json(donor);
};
*/

import Donor from "../models/Donor.js";
import bcrypt from "bcryptjs";

/* =========================================
   REGISTER DONOR
========================================= */
export const registerDonor = async (req, res) => {
  try {
    if (!Array.isArray(req.body.organs)) {
      return res.status(400).json({
        success: false,
        message: "Organs must be an array"
      });
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const organsObject = {
      kidney: null,
      liver: null,
      lung: null,
      heart: null
    };

    req.body.organs.forEach((organ) => {
      const { organType, donationType, consentGiven, medicalDetails } = organ;

      organsObject[organType] = {
        consentGiven,
        donationType,
        ...medicalDetails
      };
    });

    req.body.organs = organsObject;

    const donor = await Donor.create({
      ...req.body,
      password: hashedPassword,
      password: hashedPassword,
      aiConsent: true
    });

    res.status(201).json({
      success: true,
      donor
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================================
   DONOR DASHBOARD (DYNAMIC)
========================================= */
export const getDonorDashboard = async (req, res) => {
  try {
    const donor = await Donor.findById(req.user.id)
      .populate({
        path: "matchedRecipientId",
        select: "fullName age organNeeded bloodGroup contactNumber status"
      })
      .select("-password");

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Donor not found"
      });
    }

    res.json({
      success: true,
      donor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};