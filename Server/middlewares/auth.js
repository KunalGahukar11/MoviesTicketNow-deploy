const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verfiedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = verfiedToken.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ success: false, message: "Token is not valid" });
  }
};

module.exports = auth;
