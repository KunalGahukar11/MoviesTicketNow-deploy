const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
require("dotenv").config(); // loading env variables
const client_build_path = path.join(__dirname, "../Client/dist");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.static(client_build_path));

const userRouter = require("./Routes/userRoutes");
const dbConnection = require("./Config/dbConfig");
const movieRouter = require("./Routes/moviesRoutes");
const theatreRouter = require("./Routes/theatreRoutes");
const showRouter = require("./Routes/showsRoutes");
const bookingRouter = require("./Routes/bookingRoutes");

dbConnection();

/** Routes */
app.use(express.json()); // parse JSON bodies

app.get("/api/test", (req, res) => {
  res.json({ message: "CORS is working!" });
});

app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRouter);

app.listen(8082, (err) => {
  if (!err) {
    console.log("server is up and running");
  } else {
    console.log("Something wrong", err);
  }
});
