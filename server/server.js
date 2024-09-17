require("dotenv").config()
const express = require("express");
const app = express()
const cookieParser = require("cookie-parser");
const cors = require("cors")
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 4000

app.use(express.json()); //This middleware is used to parse incoming requests with JSON payloads.
app.use(express.urlencoded({ extended: false })); // This middleware is used to parse incoming requests with URL-encoded payloads (like form submissions).
app.use(cookieParser()); // The cookie-parser middleware is used to parse cookies attached to client requests. It populates the req.cookies object, making it easy to access cookie data from client requests.


app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}

))


//  Anytime you're accessing http://localhost:5000, you get the following 👀
app.get("/", (req, res) => {
    res.send("👀 ")
})

app.use("/api/v1/auth", require("./route/auth"))

app.use(errorHandler);
//  Connect mongodb
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server unning on port ${PORT}`)
        });
    })
    .catch((err) => console.log(err));
