const express = require("express");
const theatreRouter = express.Router();
const {
  createTheatre,
  getTheatreByOwnerId,
  getAllTheatreForAdmin,
  updateTheatre,
  deleteTheatre,
} = require("../Controller/theatreController");

// add theatres
theatreRouter.post("/add-theatre", createTheatre);

//  get all theatres for admin
theatreRouter.get("/get-all-theatre", getAllTheatreForAdmin);

// get all theatres for specific owner
theatreRouter.get("/get-theatre/:ownerId", getTheatreByOwnerId);

// update theatre
theatreRouter.put("/update-theatre", updateTheatre);

// delete theatre
theatreRouter.put("/delete-theatre", deleteTheatre);

module.exports = theatreRouter;
