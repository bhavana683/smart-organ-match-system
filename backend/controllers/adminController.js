import Donor from "../models/Donor.js";
import Recipient from "../models/Recipient.js";

export const getDonors = async (req, res) => {
  const donors = await Donor.find();
  res.json(donors);
};

export const approveDonor = async (req, res) => {
  await Donor.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ message: "Donor approved" });
};
