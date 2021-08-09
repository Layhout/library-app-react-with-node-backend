const Book = require("../models/book");

const allBooks = async (req, res) => {
    console.log("hello world");
    try {
        const books = await Book.find();
        console.log(books.data);
        res.send("hello world")
    } catch (err) {
        console.log("Fetch all book err:", err.message);
    }
}

module.exports = {
    allBooks,
}