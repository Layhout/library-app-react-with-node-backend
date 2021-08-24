import Book from "../models/book.js";

export const allBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ title: 1 });
        res.status(200).json(books)
    } catch (err) {
        console.log("Fetch all book fail:", err.message);
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
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
        res.status(500).json({ error: err.message });
    }
}

export const addBook = async (req, res) => {
    try {
        const addedBook = await Book.create(req.body);
        res.status(201).json(addedBook);
    } catch (err) {
        if (err.code === 11000) { // 11000 is a code for duplication error
            res.status(409).json({error: `Book ${err.keyValue.title} is already in the database. Please use edit option.`})
        } else {   
            console.log("Server fail:", err.message);
            res.status(500).json({ error: err.message });
        }
    }
}

export const editBook = async (req, res) => {
    const id = req.params.id
    try {
        const editedBook = await Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true });
        if (editedBook) {
            res.status(200).json(editedBook);
            return;
        }
        res.status(400).json({ error: "Edit fail. Something's wrong" });
    } catch (err) {
        console.log("Server fail:", err.message);
        res.status(500).json({ error: err.message });
    }
}

export const updBorrow = async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.body.id, { $inc: { borrowed: 1, copies: -1 } }, { useFindAndModify: false }); // $inc stands for increase
        res.status(200).json(null);
    } catch (err) {
        console.log("Server fail:", err.message);
        res.status(500).json({ error: err.message });
    }
}

export const returnBook = async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.body.id, {$inc: { copies: 1 }}, { useFindAndModify: false });
        res.status(200).json(null);
    } catch (err) {
        console.log("Server fail:", err.message);
        res.status(500).json({ error: err.message });
    }
}

export const top5Books = async (req, res) => {
    try {
        const t5B = await Book.find().sort({ borrowed: -1 }).limit(5);
        res.status(200).json(t5B);
    } catch (err) {
        console.log("Server fail:", err.message);
        res.status(500).json({ error: err.message });
    }
}