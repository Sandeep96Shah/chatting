const mongoose = require("mongoose");


const optTest = new mongoose.Schema({
    secret: {
        type: String,
    }
});

const OTPTest = mongoose.model("otpTest", optTest);

module.exports = OTPTest;