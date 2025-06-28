const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");

// Working Perfectly
requestRouter.post("/sendConectionRequest", userAuth, async (req, res) => {
  //! this [userAuth] will handle the authentication once it is used as a middleware.
  // first login to generate the cookie -> if want to check the profile check it -> check who's send the connection request.
  // get the user
  const user = req.user;
  console.log("Send a connection request");

  res.send(user.firstName + " sent the connection request!");
});

module.exports = requestRouter;
