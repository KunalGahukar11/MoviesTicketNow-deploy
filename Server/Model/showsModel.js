const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    show_time: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    movie_name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
    },
    price: {
      type: Number,
      required: true,
    },
    total_seats: {
      type: Number,
      required: true,
    },
    booked_seats: {
      type: Array,
      default: [],
    },
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theatres",
      required: true,
    },
  },
  { timestamps: true }
);

const showModel = mongoose.model("shows", showSchema);

module.exports = showModel;
