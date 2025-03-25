// console.log("starting a new project");
// import express from node modules

const express = require("express");
const connectDB = require("./config/database");
// call this express function
const app = express();

// first establish connection then listen to the app [app.listen]
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


