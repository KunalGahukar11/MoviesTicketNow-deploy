const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin", "partner"],
    default: "user",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
