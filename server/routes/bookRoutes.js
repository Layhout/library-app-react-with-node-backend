const express = require("express");
const { allBooks } = require("../controllers/bookController");

const router = express.Router();

router.get("/", allBooks);

module.exports = router;