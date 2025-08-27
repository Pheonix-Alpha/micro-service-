
import express from "express";
import Booking from "../models/Booking.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create booking
router.post("/booking", auth, async (req, res) => {
  try {
    const { product, phone } = req.body;
    const booking = new Booking({ userId: req.user.id, product, phone });
    await booking.save();
    res.json({ message: "Booking created", booking });
  } catch (err) {
    res.status(500).json({ message: "Error creating booking" });
  }
});

// Get all bookings for logged-in user
router.get("/bookings", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

export default router;
