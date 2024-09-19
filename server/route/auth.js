const express = require("express");
const { createUser, loginUser, logoutUser, getUsers, deleteUser, getUser, upgradeUser, sendVerificationEmail } = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const route = express.Router()

route.post("/create-account", createUser)
route.post("/login-user", loginUser)
route.post("/logout-user", protect, logoutUser)
route.post("/upgrade-user", protect, adminOnly, upgradeUser)
route.patch("/update-user", protect, upgradeUser)
route.post("/sendVerificationEmail", protect, sendVerificationEmail);


route.get("/get-users", protect, getUsers)


route.delete("/delete-user/:id", protect, adminOnly, deleteUser)
route.get("/get-user/:id", protect, getUser)


module.exports = route;