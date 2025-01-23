const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { model } = require("mongoose");
const bookingModel = require("../Model/bookingModel");
const showModel = require("../Model/showsModel");
const { populate } = require("../Model/userModel");

// make payment
const makePayment = async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Token has been assigned to the movie",
      confirm: true,
    });
    const transactionId = paymentIntent.id;
    res.status(200).json({
      success: true,
      message: "payment successful",
      data: transactionId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateBookedSeats = async (req, res) => {
  try {
    const newBooking = new bookingModel(req.body);
    await newBooking.save();
    const show = await showModel.findById(req.body.show).populate("movie_name");
    let updatedSeats = [...show.booked_seats, ...req.body.seats];
    await showModel.findByIdAndUpdate(req.body.show, {
      booked_seats: updatedSeats,
    });
    res.status(200).json({ success: true, message: "Booking successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({ user: req.params.uesrId })
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: { path: "movie_name", model: "movies" },
      })
      .populate({
        path: "show",
        populate: { path: "theatre", model: "theatres" },
      });

    res
      .status(200)
      .json({ success: true, message: "All Bookings", data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  makePayment,
  updateBookedSeats,
  getAllBookings,
};
