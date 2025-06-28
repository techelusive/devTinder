const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../utils/Validation");

const express = require("express");
const profileRouter = express.Router();

// Working Perfectly
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

//Working
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    //console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.send(` ${loggedInUser.firstName}, your profile updated successfully`);

    // best way of doing it
    // res.json({
    //   message: `${loggedInUser.firstName}, your profile updated successfully`,
    //   data: loggedInUser,
    // });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = profileRouter;
