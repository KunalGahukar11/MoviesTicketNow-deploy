const express = require("express");
const {
  addShow,
  getAllShows,
  getShowById,
  updateShow,
  deleteShow,
  getShowByTheatre,
  getAllTheatreByMoviesAndDate,
} = require("../Controller/showsController");
const showRouter = express.Router();

// to add show
showRouter.post("/add-show", addShow);

// to get all show
showRouter.get("/get-show", getAllShows);

// to get a specific show
showRouter.get("/get-show/:id", getShowById);

// get all theatre show by movies and date
showRouter.get("/get-all-theatres/:movie/:date", getAllTheatreByMoviesAndDate);

// update a show
showRouter.put("/update-show/:id", updateShow);

// get show by theatre
showRouter.get("/get-show-by-theatre/:theatreId", getShowByTheatre);

// delete a show
showRouter.put("/delete-show", deleteShow);

module.exports = showRouter;
