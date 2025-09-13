import mongoose from "mongoose";

const fingerprintSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: [true, "Please provide a password"], // Password is mandatory
      minlength: [6, "Password must be at least 6 characters long"], // Enforce minimum length
      select: false, // Prevent password from being returned by default in queries
    },
  },
  {
    timestamps: true,
  }
);

const Fingerprint = mongoose.model("Fingerprint", fingerprintSchema);

export default Fingerprint;