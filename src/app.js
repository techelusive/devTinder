// console.log("starting a new project");
// import express from node modules
const express = require("express");

// call this express function
const app = express();

// this will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({
        firstName: "Rohit",
        lastName: "Singh"
    });
});

app.post("/user", (req, res) => {
    // save data to the database
    res.send("Data successfully saved to the database");
});

app.patch("/user", (req, res) => {
    res.send("Chnages updated");
});

app.delete("/user", (req, res) => {
    res.send("Data dalete successfully");
});

// this will match all the HTTP method API calls to /run
app.use("/run", (req, res) => {
    res.send("Hello form server");
});


// listen incoming requests on port
app.listen(7770, () => {
    console.log("server is successfully listening on port 777 .....")
});
