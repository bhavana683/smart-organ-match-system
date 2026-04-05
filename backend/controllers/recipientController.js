import Recipient from "../models/Recipient.js";
import bcrypt from "bcryptjs";

/* =========================================
   REGISTER RECIPIENT
========================================= */
export const registerRecipient = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const recipient = await Recipient.create({
      ...req.body,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      recipient
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* =========================================
   RECIPIENT DASHBOARD (DYNAMIC)
========================================= */
export const getRecipientDashboard = async (req, res) => {
  try {
    const recipient = await Recipient.findById(req.user.id).select("-password");

    if (!recipient) {
      return res.status(404).json({
        success: false,
        message: "Recipient not found"
      });
    }

    res.json({
      success: true,
      recipient
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};