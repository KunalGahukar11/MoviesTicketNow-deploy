const userModel = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");

// register an user
const registerUser = async (req, res) => {
  try {
    const userExists = await userModel.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(409).send({
        success: false,
        message: "Email already register",
      });
    }

    const newUser = new userModel(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "Registration Successfull. Please login to continue",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// to login into account
const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found, Please register first",
      });
    }

    if (req.body.password !== user.password) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    });
    res.send({
      success: true,
      message: "Login Successful",
      data: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      data: user,
      message: "You are authorized to go to the protected route",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
