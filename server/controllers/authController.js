const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Token = require("../model/tokenModel");
const User = require("../model/authModel");
const Cryptr = require("cryptr");
const crypto = require("crypto");
const { generateToken, hashToken, sendMail } = require("../utils/index");
const jwt = require("jsonwebtoken");

const cryptr = new Cryptr(process.env.CRYPTR_KEY)


exports.createUser = asyncHandler(async (req, res) => {
    // Request properties for the user
    const { fullName, emailAddress, password } = req.body;

    // check if the properties are provided
    if (!fullName || !emailAddress || !password) {
        res.status(400);
        throw new Error("Please, fill all fields");
    }

    //  check if the password length is less than 8 chars
    if (password.lenght < 8) {
        res.status(400);
        throw new Error("Password must be of 8 characters long")
    }

    // Check if a user with the supplied email already exists
    const checkUser = await User.findOne({ emailAddress });

    if (checkUser) {
        res.status(400);
        throw new Error("Email already taken, do you already have an account?")
    }
    //  save user object to the database
    const newUser = await User.create({
        fullName,
        emailAddress,
        password
    })

    // generate a token and attach it to the regitstered user
    const token = generateToken(newUser._id)

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
    });

    if (newUser) {
        await sendMail({
            from: process.env.EMAIL_USER,
            to: newUser.emailAddress,
            subject: "Account created Successfully",
            html: `
                Hi ${newUser.fullName},\n
                We're excited to have you on board!

                Your account has been successfully created on user-auth-starter-kit, and you're now ready to explore all the features we offer.

                Here's a summary of your account details:
                
                Email: ${newUser.emailAddress}
               Phone Number: ${newUser.phone_no}

                If you ever have any questions or need assistance, don't hesitate to reach out to our support team at [Support Email]. We're here to help!

                Thank you for joining us. We're looking forward to seeing you thrive on our platform.

                Best regards,
                user-auth-starter-kit
                
                `
        })
        const { _id,
            fullName,
            emailAddress,
            phone_no,
            address,
            verified,
            role,
            gender,
            picture } = newUser;

        console.log(newUser);

        res.json({
            _id,
            fullName,
            emailAddress,
            phone_no,
            address,
            verified,
            role,
            gender,
            picture,
            token
        })
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

})

exports.loginUser = asyncHandler(async (req, res) => {
    const { emailAddress, password } = req.body;

    if (!emailAddress || !password) {
        res.status(400);
        throw new Error("All fields are required!")
    }

    const foundUser = await User.findOne({ emailAddress });

    if (!foundUser) {
        res.status(404);
        throw new Error("User not found! Are you registered?")
    }

    const checkPassword = await bcrypt.compare(password, foundUser.password);

    if (!checkPassword) {
        res.status(400);
        throw new Error("Email or Password incorrect")
    }

    const token = generateToken(foundUser._id)

    // Send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
    });

    if (foundUser && checkPassword) {
        const { _id,
            fullName,
            emailAddress,
            phone_no,
            address,
            verified,
            role,
            gender,
            picture } = foundUser;

        console.log(foundUser);

        res.json({
            _id,
            fullName,
            emailAddress,
            phone_no,
            address,
            verified,
            role,
            gender,
            picture,
            token
        })
    }

})

exports.logoutUser = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({ message: "User logged out successfully!" })
})

exports.getUser = asyncHandler(async (req, res) => { })

exports.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().sort("-createdAt").select("-password").exec();

    if (!users) {
        res.status(404)
        throw new Error("Users not found!");
    }

    return res.status(200).json(users);
})

exports.upgradeUser = asyncHandler(async (req, res) => { })
exports.updateUser = asyncHandler(async (req, res) => { })
exports.verifyUser = asyncHandler(async (req, res) => { })
exports.deleteUser = asyncHandler(async (req, res) => { })
exports.resetPassword = asyncHandler(async (req, res) => { })
exports.loginWithGoogle = asyncHandler(async (req, res) => { })