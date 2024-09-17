const express = require("express");
const { createUser } = require("../controllers/authController");
const route = express.Router()

route.post("/create-account", createUser)

module.exports = route;