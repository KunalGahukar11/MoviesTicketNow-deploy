const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL;

const dbConnection = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to DB");
  } catch (error) {
    console.log("error while connecting", error);
  }
};

module.exports = dbConnection;
