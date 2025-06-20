const express = require("express");
const connectDB = require("./config/database");
// call express function
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/Validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
const { userAuth } = require("../src/middleware/auth.js");

// middleware -> this middleware now activate for all the routs.
// create in [chapter - 07] -> for reading json object -> convert this into javascript object to read.
app.use(express.json());
app.use(cookieParser());

// creating an api using HTTP method - [post]
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    // validation
    validateSignUpData(req);
    // only these will be allowed.
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  // get the cookie
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

app.post("/sendConectionRequest", userAuth, async (req, res) => {
  //! this [userAuth] will handle the authentication once it is used as a middleware.
  // first login to generate the cookie -> if want to check the profile check it -> check who's send the connection request.
  // get the user
  const user = req.user;
  console.log("Send a connection request");

  res.send(user.firstName + " sent the connection request!");
});

// first establish connection then listen to the app [app.listen] -> ? correct approach
connectDB()
  .then(() => {
    console.log("Database connection successfully establish");
    app.listen(7777, () => {
      console.log("Server is successful");
    });
  })
  .catch((err) => {
    console.error("Database not establish");
  });
