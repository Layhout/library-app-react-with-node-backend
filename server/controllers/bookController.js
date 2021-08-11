import Book from "../models/book.js";

export const allBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ title: 1 });
        res.status(200).json(books)
    } catch (err) {
        console.log("Fetch all book fail:", err.message);
        res.status(500).json({ errMsg: err.message });
    }
}

export const getOneBook = async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        if (book) {
            console.log("book found");
            res.status(200).json(book);
            return;
        }
        console.log("didn't find the book");
        res.status(404).json(null);
    } catch (err) {
        console.log("Server fail:", err.message);
        res.status(500).json({ errMsg: err.message });
    }
}

export const deleteOneBook = async (req, res) => {
    try {
        const id = req.params.id;
        const dBook = await Book.findByIdAndDelete(id);
        if (dBook) {
            res.status(200).json({ msg: "Delete successfully" });
            return;
        }
        console.log("This book doesn't exist to be deleted...");
        res.status(404).json(null);
    } catch (err) {
        console.log("Server fail:", err.message);
        res.status(500).json({ errMsg: err.message });
    }
}

export const addBook = async (req, res) => {
    try {
        const foundBook = await Book.findOne({ title: req.body.title.trim().toLowerCase() })
        if (foundBook) {
            res.status(409).json({ msg: "Book already exists" });
            return;
        }
        const newBook = new Book({ ...req.body, title: req.body.title.trim().toLowerCase(), img: req.body.img.trim(), author: req.body.author.trim().toLowerCase(), publisher: req.body.publisher.trim().toLowerCase() });
        const addedBook = await newBook.save();
        res.status(201).json(addedBook);
    } catch (err) {
        console.log("Server fail:", err.message);
        res.status(500).json({ errMsg: err.message });
    }
}

export const editBook = async (req, res) => {
    try {
        const editedBook = await Book.findByIdAndUpdate(req.body.id, req.body, { useFindAndModify: false, new: true });
        if (editedBook) {
            res.status(200).json(editedBook);
            return;
        }
        res.status(400).json({ msg: "Edit fail. Something's wrong" });
    } catch (err) {
        console.log("Server fail:", err.message);
        res.status(500).json({ errMsg: err.message });
    }
}

export const updBorrow = async (req, res) => {
    try {
        const foundB = await Book.findById(req.body.id);
        await Book.findByIdAndUpdate(req.body.id, { borrowed: ++foundB.borrowed, copies: --foundB.copies }, { useFindAndModify: false });
        res.status(200).json(null);
    } catch (err) {
        console.log("Server fail:", err.message);
        res.status(500).json({ errMsg: err.message });
    }
}

export const returnBook = async (req, res) => {
    try {
        const returnedB = await Book.findById(req.body.id);
        await Book.findByIdAndUpdate(req.body.id, { copies: ++returnedB.copies }, { useFindAndModify: false });
        res.status(200).json(null);
    } catch (err) {
        console.log("Server fail:", err.message);
        res.status(500).json({ errMsg: err.message });
    }
}

export const top5Books = async (req, res) => {
    try {
        const t5B = await Book.find().sort({ borrowed: -1 }).limit(5);
        res.status(200).json(t5B);
    } catch (err) {
        console.log("Server fail:", err.message);
        res.status(500).json({ errMsg: err.message });
    }
}