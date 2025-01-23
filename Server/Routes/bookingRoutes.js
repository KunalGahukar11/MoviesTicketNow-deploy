const express = require("express");
const authMiddelware = require("../middlewares/auth");
const {
  makePayment,
  updateBookedSeats,
  getAllBookings,
} = require("../Controller/bookingController");

const bookingRouter = express.Router();

// to make payments
bookingRouter.post("/make-payment", authMiddelware, makePayment);

// book-show
bookingRouter.post("/book-show", authMiddelware, updateBookedSeats);

// get all bookings
bookingRouter.get("/get-all-bookings/:userId", authMiddelware, getAllBookings);

module.exports = bookingRouter;
