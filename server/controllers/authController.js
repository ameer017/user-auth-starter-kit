const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Token = require("../model/tokenModel");
const User = require("../model/authModel");


exports.createUser = asyncHandler(async (req, res) => { })
exports.loginUser = asyncHandler(async (req, res) => { })
exports.logoutUser = asyncHandler(async (req, res) => { })
exports.getUser = asyncHandler(async (req, res) => { })
exports.getUsers = asyncHandler(async (req, res) => { })
exports.upgradeUser = asyncHandler(async (req, res) => { })
exports.updateUser = asyncHandler(async (req, res) => { })
exports.verifyUser = asyncHandler(async (req, res) => { })
exports.deleteUser = asyncHandler(async (req, res) => { })
exports.resetPassword = asyncHandler(async (req, res) => { })
exports.loginWithGoogle = asyncHandler(async (req, res) => { })