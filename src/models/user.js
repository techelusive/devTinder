const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

// creating a user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      lowercase: true,
      minLength: 4,
      maxLength: 50,
    },
    age: {
      type: Number,
      min: 18, // if number use [min]
    },
    gender: {
      type: String,
      // i don't need validation after using enum
      enum: {
        values: ["Male", "Female", "Other", "male", "female", "other"],
        message: `{VALUE} is not a gender type`,
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

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "GURUJIKIJAY@19", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const hashPassword = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    hashPassword
  );
  return isPasswordValid;
};

// Creating a mongoose model

// Method -1
const User = mongoose.model("User", userSchema);
module.exports = User;

// Method - 2
// module.exports = mongoose.model("User", userSchema);
