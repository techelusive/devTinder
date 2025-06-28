const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auths");
const profileRouter = require("./routes/profiles");
const requestRouter = require("./routes/requests");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// first establish connection then listen to the app [app.listen] -> ? correct approach
connectDB()
  .then(() => {
    console.log("Database connection successfully establish");
    app.listen(7777, () => {
      console.log("Server is successful");
    });
  })
  .catch((err) => {
    console.error("Database not establish:" + err.message);
  });
