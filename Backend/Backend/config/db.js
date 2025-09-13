import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGODB: ", conn.connection.host);
  } catch (err) {
    throw err;
  }
};