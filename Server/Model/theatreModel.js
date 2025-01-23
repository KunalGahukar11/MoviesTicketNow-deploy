const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
    mobile_no: { type: Number, required: true },
    email: { type: String, required: true },
    screens: { type: Number, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const theatreModel = mongoose.model("theatres", theatreSchema);

module.exports = theatreModel;
