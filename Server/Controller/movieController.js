const movieModel = require("../Model/movieModel");

const createMovies = async (req, res) => {
  try {
    const movie = await movieModel.findOne({ title: req.body.title });

    if (movie) {
      return res.status(409).json({
        success: false,
        error: `Movie ${req.body.title} already exist`,
      });
    }

    const newMovie = new movieModel(req.body);
    await newMovie.save();
    res.status(201).json({
      success: true,
      message: `Movie ${req.body.title} added successfully`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

// to get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel.find();

    if (!movies) {
      return res
        .status(404)
        .json({ success: false, error: "Movies not found" });
    }

    res.status(200).json({ success: true, data: movies });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

// get movie by id
const getMovieById = async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.movieId);

    if (!movie) {
      return res.status(404).json({
        success: false,
        error: "Movie not found",
      });
    }

    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// update movies
const updateMovie = async (req, res) => {
  try {
    const movie = await movieModel.findByIdAndUpdate(
      req.body.movieId,
      req.body,
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({
        success: false,
        error: "Movie not found",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Movie Updated successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// delete movie
const deleteMovie = async (req, res) => {
  try {
    await movieModel.findByIdAndDelete(req.body.movieId);

    res
      .status(200)
      .json({ success: true, message: "Movie delete successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

module.exports = {
  createMovies,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
