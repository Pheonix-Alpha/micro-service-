import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// Update profile
router.patch("/user/profile", auth, async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    if (!name && !phone && !address) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { name, phone, address } },
      { new: true }
    ).lean();

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
