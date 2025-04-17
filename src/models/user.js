const mongoose = require('mongoose')

// creating a user schema 
const userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required : true,
        lowercase : true,
        unique : true,
        minLength : 4,
        maxLength : 50,
    },
    lastName: {
        type: String,
        lowercase : true,
        unique : true,
        minLength : 4,
        maxLength : 50,
    },
    age: {
        type: Number,
        min : 18, // if number use [min]
    },
    gender: {
        type: String,
        // create a custom function for gender validation
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender is not valid");
            }
        }
    },
    emailId: {
        type: String,
        lowercase : true,
        required : true,
        unique : true,
        trim : true,
    },
    password: {
        type: String
    },
    photoUrl: {
        type : String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTdD2LkrqGa6G0A-JObFZNgHdbTDgXW-m2KQ&s",
    },
    about: {
        type: String,
        default : "This is default about the user",
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
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

// Method - 2
// module.exports = mongoose.model("User", userSchema);