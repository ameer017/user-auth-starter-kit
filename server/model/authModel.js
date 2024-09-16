const mongoose = require("mongoose");


const authModel = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone_no: {
        type: Number,
        default: "08123456789"
    },
    address: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "User"
        //Admin, Suspended
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", authModel);
module.exports = User;