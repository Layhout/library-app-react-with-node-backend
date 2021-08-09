const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    genre: {
        type: Array,
    },
    synopsis: {
        type: String,
        required: true
    },
    borrowed: {
        type: Number,
        default: 0,
    },
    copies: {
        type: Number,
        default: 0,
        required: true,
    }
},
    {
        versionKey: false,
    }
);

const Book = mongoose.model("book", bookSchema);
module.exports = Book;