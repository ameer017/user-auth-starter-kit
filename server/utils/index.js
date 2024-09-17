const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const nodemailer = require("nodemailer");

//  This function generates a JSON Web Token (JWT) for a user based on their id.
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

//  Purpose: This function takes a token (usually a string) and hashes it using the SHA-256 cryptographic hash algorithm.
const hashToken = (token) => {
    return crypto.createHash("sha256").update(token.toString()).digest("hex");
};

const sendMail = async (mailOptions) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = {
    generateToken, 
    hashToken, 
    sendMail
}