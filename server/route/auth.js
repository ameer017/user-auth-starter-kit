const express = require("express");
const { createUser, loginUser, logoutUser, getUsers, deleteUser, getUser, upgradeUser, sendVerificationEmail, verifyUser, updateUser, resetPassword, changePassword, forgotPassword, loginWithGoogle, loginStatus } = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const route = express.Router()

route.post("/create-account", createUser)
route.post("/login-user", loginUser)
route.post("/logout-user", protect, logoutUser)
route.post("/upgrade-user", protect, adminOnly, upgradeUser)
route.patch("/update-user", protect, updateUser)
route.post("/send-verification-email", protect, sendVerificationEmail);
route.patch("/verify-user/:verificationToken", verifyUser);
route.patch("/reset-password/:resetToken", resetPassword);
route.patch("/change-password", protect, changePassword);
route.post("/forgot-password", forgotPassword);
route.post("/google/callback", loginWithGoogle);


route.get("/login-status", loginStatus);
route.get("/get-users", protect, getUsers)


route.delete("/delete-user/:id", protect, adminOnly, deleteUser)
route.get("/get-user", protect, getUser)


module.exports = route;