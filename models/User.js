import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
   phone: { type: String, default: "" },       // New field for phone number
    address: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);