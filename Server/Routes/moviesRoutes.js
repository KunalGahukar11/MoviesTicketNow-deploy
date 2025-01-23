const express = require("express");
const {
  createMovies,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../Controller/movieController");
const movieRouter = express.Router();

movieRouter.post("/add-movie", createMovies);

movieRouter.get("/all-movies", getAllMovies);

movieRouter.get("/by-movieId/:movieId", getMovieById);

movieRouter.put("/update-movie", updateMovie);

movieRouter.put("/delete-movie", deleteMovie);

module.exports = movieRouter;
