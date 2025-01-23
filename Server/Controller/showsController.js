const showModel = require("../Model/showsModel");

// to add a show
const addShow = async (req, res) => {
  try {
    const newShow = new showModel(req.body);
    await newShow.save();
    res.status(200).send({ success: true, message: "Show added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get all shows detail
const getAllShows = async (req, res) => {
  try {
    const shows = await showModel
      .find()
      .populate("movie_name")
      .populate("theatre");

    if (!shows) {
      return res.status(404).json({ success: false, error: "Shows not found" });
    }

    res.status(200).json({ success: true, message: "Shows", data: shows });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get show by id
const getShowById = async (req, res) => {
  try {
    const showId = req.params.id;
    const show = await showModel
      .findById(showId)
      .populate("movie_name")
      .populate("theatre");

    if (!show) {
      return res.status(404).json({ success: false, error: "Shows not found" });
    }

    res.status(200).json({ success: true, message: "Show", data: show });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get show by theatre
const getShowByTheatre = async (req, res) => {
  try {
    const theatreId = req.params.theatreId;
    const shows = await showModel
      .find({ theatre: theatreId })
      .populate("movie_name")
      .populate("theatre");

    if (!shows) {
      return res
        .status(404)
        .json({ success: false, message: "shows not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "shows for theatre", data: shows });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get all theatre by movies and date
const getAllTheatreByMoviesAndDate = async (req, res) => {
  try {
    const { movie, date } = req.params;

    const shows = await showModel
      .find({ movie_name: movie, date })
      .populate("theatre");

    if (!shows) {
      return res
        .status(404)
        .json({ success: false, message: "Show not found" });
    }

    const uniqueTheatres = [];
    shows.forEach((show) => {
      const isTheatre = uniqueTheatres.find(
        (theatre) => theatre._id === show.theatre._id
      );

      if (!isTheatre) {
        const showsOfThisTheatre = shows.filter(
          (showObj) => showObj.theatre._id == show.theatre._id
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfThisTheatre,
        });
      }
    });

    res.send({
      success: true,
      data: uniqueTheatres,
      message: "Theatres fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// to update a show
const updateShow = async (req, res) => {
  try {
    const showId = req.params.id;
    const show = await showModel.findByIdAndUpdate(showId, req.body, {
      new: true,
    });

    if (!show) {
      return res.status(404).json({ success: false, error: "Shows not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Show updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// to delete a show
const deleteShow = async (req, res) => {
  try {
    const show = await showModel.findByIdAndDelete(req.body.showId, {
      new: true,
    });

    if (!show) {
      return res.status(404).json({ success: false, error: "Shows not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Show deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  addShow,
  getAllShows,
  getShowById,
  updateShow,
  deleteShow,
  getShowByTheatre,
  getAllTheatreByMoviesAndDate,
};
