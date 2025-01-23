const theatreModel = require("../Model/theatreModel");

// to create theatre
const createTheatre = async (req, res) => {
  try {
    const newTheatre = await theatreModel(req.body);
    await newTheatre.save();

    res.status(201).json({
      success: true,
      message: "Theatre added successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// get all the theatre
const getAllTheatreForAdmin = async (req, res) => {
  try {
    const theatre = await theatreModel.find().populate("owner");
    if (!theatre) {
      return res
        .status(404)
        .json({ success: false, error: "theatre not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "All theatre", data: theatre });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// get theatre by owner id
const getTheatreByOwnerId = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const theatre = await theatreModel.find({ owner: ownerId });

    if (!theatre) {
      return res
        .status(404)
        .json({ success: false, error: "theatre not found" });
    }

    res.status(200).json({ success: true, message: "theatre", data: theatre });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// update theatre by id
const updateTheatre = async (req, res) => {
  try {
    const theatre = await theatreModel.findByIdAndUpdate(
      req.body.theatreId,
      req.body,
      { new: true }
    );
    if (!theatre) {
      return res
        .status(404)
        .json({ success: false, error: "theatre not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "theatre update successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const deleteTheatre = async (req, res) => {
  try {
    const theatre = await theatreModel.findByIdAndDelete(req.body.theatreId, {
      new: true,
    });
    if (!theatre) {
      return res
        .status(404)
        .json({ success: false, error: "theatre not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "theatre deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = {
  createTheatre,
  getAllTheatreForAdmin,
  getTheatreByOwnerId,
  updateTheatre,
  deleteTheatre,
};
