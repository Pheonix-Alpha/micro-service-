import express from "express";
import Booking from "../models/Booking.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create booking (order)
router.post("/booking", auth, async (req, res) => {
  try {
    const { items, phone, address } = req.body;
    if (!items || !items.length) return res.status(400).json({ message: "Cart is empty" });
    if (!phone || !address) return res.status(400).json({ message: "Phone & address required" });

    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    const booking = new Booking({
      userId: req.user.id,
      items,
      phone,
      address,
      total,
    });

    await booking.save();
    res.json({ message: "Order placed successfully", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error placing order" });
  }
});

// Get all bookings for logged-in user
router.get("/bookings", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

export default router;
