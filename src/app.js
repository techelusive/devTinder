// console.log("starting a new project");
// import express from node modules
const express = require("express");

// call this express function
const app = express();

app.use("/run", (req, res) => {
    res.send("Hello form server");
});

// listen incoming requests on port
app.listen(7770, () => {
    console.log("server is successfully listening on port 777 .....")
});
