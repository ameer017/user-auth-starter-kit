const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({

})

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;