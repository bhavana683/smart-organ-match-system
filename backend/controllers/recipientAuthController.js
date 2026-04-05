import Recipient from "../models/Recipient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* -----------------------------
   RECIPIENT LOGIN
-------------------------------- */
export const recipientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const recipient = await Recipient.findOne({ email });
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    const isMatch = await bcrypt.compare(password, recipient.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: recipient._id, role: "recipient" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: recipient._id,
        fullName: recipient.fullName,
        email: recipient.email,
        role: "recipient"
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};