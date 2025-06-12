const mongoose = require("mongoose");
const validator = require("validator");

// creating a user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      lowercase: true,
      unique: true,
      minLength: 4,
      maxLength: 50,
    },
    age: {
      type: Number,
      min: 18, // if number use [min]
    },
    gender: {
      type: String,
      // create a custom function for gender validation
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        console.log("Checking", value);
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address:" + value);
        }
      },
    },
    password: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter strong password:", value);
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTdD2LkrqGa6G0A-JObFZNgHdbTDgXW-m2KQ&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo url:", value);
        }
      },
    },
    about: {
      type: String,
      default: "This is default about the user",
      minLength: 10,
      maxLength: 1000,
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// Creating a mongoose model

// Method -1
const User = mongoose.model("User", userSchema);
module.exports = User;

// Method - 2
// module.exports = mongoose.model("User", userSchema);
