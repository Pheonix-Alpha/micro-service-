import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
