const asyncHandler = require("express-async-handler");
const User = require("../model/authModel");
const jwt = require("jsonwebtoken")


// To ensure that the user must be logged in before accessing some -if not all - routes.
//  When a user registers/login, the user's token is generated with JWT which now acts as the cookies.
const protect = asyncHandler(async (req, res, next) => {

    // This is how the token is retrieved from the cookies response
    const token = req.cookies.token;

    if (!token) {
        res.status(401);
        throw new Error("Unauthorized, Please login");
    }

    // Verify that the token is correlating with what JWT generated in the first place
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id).select("-password")

    // If the token cannot be verified, then user is not found.
    if (!user) {
        res.status(400);
        throw new Error("User not found 😔")
    }

    //  Check for the current role of the user.
    if (user.role === "Suspended") {
        res.status(400);
        throw new Error("User suspended, please contact support. 😔")
    }

    // This is where we specified that the logged in user is the one making the request.
    req.user = user;
    next(); // Proceed with the request.
})

// To ensure that only verified accounts can access the routes
const verifiedOnly = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isverified) { // If the user is logged in and verified
        next()  // Proceed with the request.
    } else {
        res.status(401)
        throw new Error("Account not verified")
    }
})

// Routes created for only admins
const adminOnly = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.role === "Admin") { // If the user is logged in and an Admin
        next() // Proceed with the request.
    } else {
        res.status(401)
        throw new Error("You are not an Admin")
    }
})

// You can create as many as possible role-based [Admin, Seller, Buyer etc]route, it depends on what you want to do.

module.exports = {
    protect, verifiedOnly, adminOnly
}