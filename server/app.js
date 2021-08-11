import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import bookRoutes from "./routes/bookRoutes.js";
import visitorRouters from "./routes/visitorRouters.js";
import cardRouters from "./routes/cardRouters.js";

// create express app
const app = express();

// connect to db and listening
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connect to DB!");
    })
    .catch((err) => console.log(err));

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.use("/books", bookRoutes);
app.use("/visitors", visitorRouters);
app.use("/cards", cardRouters);

app.listen(1000, () => {
    console.log("listen on port 1000");
});