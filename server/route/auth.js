const express = require("express");
const { createUser, loginUser, logoutUser, getUsers } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const route = express.Router()

route.post("/create-account", createUser)
route.post("/login-user", loginUser)
route.post("/logout-user", protect,  logoutUser)


route.get("/get-users", protect,  getUsers)

module.exports = route;