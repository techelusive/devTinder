const express = require("express");
const userAuth = express.Router();
const { validateSignUpData } = require("../utils/Validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Working Properly
userAuth.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    // validation
    validateSignUpData(req);
    // only these will be allowed.
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    //console.log(passwordHash);
    // Creating a new instance of the user model
    // good way is explicitly mention all the fields
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added Successsfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Working Properly
userAuth.post("/login", async (req, res) => {
  try {
    // extract the emailId and password from the user's input.
    const { emailId, password } = req.body;

    // Checking whether the user exists with this email
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    // use the method of validating the password
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // And we don't have to manage how to get the jwt token inside an api.
      const token = await user.getJWT();
      // Add the token to cookie and send the response back to the user.
      res.cookie("token", token, {
        // expire the cookie
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successfully!!!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

userAuth.post("/logout", async (req, res) => {
  //send the token from cookie to null
  console.log(req.cookies.token);
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logout Successfully!!!");
});

module.exports = userAuth;
