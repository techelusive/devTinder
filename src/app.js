const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user")
// call express function
const app = express();

// middleware
app.use(express.json())
// creating an api using HTTP method - [post] 
app.post("/signup", async (req, res) => {
    console.log(req.body);

    const user = new User(req.body)
    //create an userObject
    const userObj = {
        firstName: "ravi",
        lastName: "Kishan",
        emailId: "ravi@456gmail.com",
        password: "ravi@987",
    }

    // creating a new instance of the user model
    //         [or]
    // creating a new user with (userObj) data.
    // const user = new User(userObj)

    // after creating an instance we have to save it.
    // after saving this data is saved inside the database.
    // since, this return us a ppromise we have to use async await and don't forget to use try and catch  
    try {
        await user.save();
        res.send("User Added Successsfully")
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message)
    }
})

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
})

// get all the data 
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});// if we pass empty here then it will give all the data 
        res.send(users);
    } catch(err) {
        res.status(400).send("Something went wrong");
    }
})

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


