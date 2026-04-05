import Donor from "../models/Donor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const donorLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT secret is not configured" });
  }

  const donor = await Donor.findOne({ email });
  if (!donor) {
    return res.status(404).json({ message: "Donor not found" });
  }

  const isMatch = await bcrypt.compare(password, donor.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: donor._id, role: "donor" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      id: donor._id,
      fullName: donor.fullName,
      email: donor.email,
      role: "donor"
    }
  });
};
