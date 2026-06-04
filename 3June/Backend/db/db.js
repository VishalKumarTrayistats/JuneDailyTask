import mongoose from "mongoose";

export const DBConnection = (url) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.log("DB connection error:", err);
    });
};