const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

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
        default: "No 4, Lagos street"
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
    },
    picture: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
    }
}, {
    timestamps: true,
    minimize: false,
})

authModel.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});


const User = mongoose.model("User", authModel);
module.exports = User;