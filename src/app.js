const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
// call express function
const app = express();
const { validateSignUpData } = require("./utils/Validation");
const bcrypt = require("bcrypt");

// middleware -> this middleware now activate for all the routs.
// create in [chapter - 07] -> for reading json object -> convert this into javascript object to read.
app.use(express.json());
// creating an api using HTTP method - [post]
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    // validation
    //validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    // Creating a new instance of the user model
    // this is the bad way -> const user = new User(req.body)
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
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// creating an GET api -> get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  // ? [findOne] find the data of 1 user
  // try {
  //     console.log(userEmail);
  //     const user = await User.findOne({ emailId: userEmail });
  //     if (!user) {
  //         res.status(404).send("User not found");
  //     } else {
  //         res.send(user);
  //     }
  // } catch(err) {
  //     res.status(400).send("Something went wrong");
  // }
  // now find the user in the database
  // try {
  //     const users = await User.find({ emailId: userEmail }) // this returns us a promise so use async await
  //     if (users.length === 0) {
  //         res.status(404).send("user not found")
  //     } else {
  //         res.send(users)
  //     }
  // } catch(err) {
  //     res.status(400).send("Something went wrong");
  // }
});

// get all the data
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); // if we pass empty here then it will give all the data
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// delete the user data
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// update the user data using [patch]
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  //const userId = req.body.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("skills are not more than 10");
    }

    const users = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      //  mongoose doc -> API -> Model -> findByIdAndUpdate -> inside the options -> options.runValidators
      runValidators: true,
    });
    console.log(users);
    res.send("User update Successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
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
