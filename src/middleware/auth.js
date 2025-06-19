const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the cookie
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token");
    }
    // Validate the token
    const decodeObj = await jwt.verify(token, "GURUJIKIJAY@19");
    // get the user id from the token
    const { _id } = decodeObj;
    // find the user using id.
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found");
    }

    // attach user with the req.user
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
