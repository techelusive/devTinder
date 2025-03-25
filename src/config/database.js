
// const password = "vFEZDe6zwBL2@Fh"
const mongoose = require("mongoose");

// Real URI = "mongodb+srv://singhRohit:vFEZDe6zwBL2%40Fh@cluster1.1rmxj.mongodb.net/";

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://singhRohit:vFEZDe6zwBL2%40Fh@cluster1.1rmxj.mongodb.net/"
    );
};

module.exports = connectDB;

