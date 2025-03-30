const mongoose = require('mongoose')

// creating a user schema 
const userSchema = mongoose.Schema({

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    }
});

// Creating a mongoose model

// Method -1
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

// Method - 2
// module.exports = mongoose.model("User", userSchema);