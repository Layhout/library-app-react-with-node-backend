const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const bookRoutes = require("./routes/bookRoutes");

// create express app
const app = express();

// connect to db and listening
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connect to DB!");
    })
    .catch((err) => console.log(err));

// middleware
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// routes
app.get("/books", (req, res) => {
    console.log("hello world");
    res.send("hello world");
});

app.get("/", (req, res) => {
    console.log("hello world");
    res.send("hello world");
});

app.listen(3000, () => {
    console.log("listen on port 3000");
});