import Visitor from "../models/visitor.js";

export const allVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find().sort({ name: 1 });
        res.status(200).json(visitors);
    } catch (err) {
        console.log("Fetch visitors fail:", err.message);
        res.status(500).json({ error: err.message });
    }
}

export const addVisitor = async (req, res) => {
    try {
        const addedVisitor = await Visitor.create({...req.body, borrow: 0});
        res.status(201).json(addedVisitor);
    } catch (err) {
        if (err.code === 11000) { // 11000 is a code for duplication error
            res.status(409).json({ error: `Visitor ${err.keyValue.name} is already in the database. Please use edit option.` });
        } else {
            console.log("Server fail:", err.message);
            res.status(500).json({ error: err.message });
        }
    }
}

export const editVisitor = async (req, res) => {
    try {
        const editedVisitor = await Visitor.findByIdAndUpdate(req.body.id, req.body, { useFindAndModify: false, new: true });
        if (editedVisitor) {
            res.status(200).json(editedVisitor);
            return;
        }
        res.status(400).json(null);
    } catch (err) {
        console.log("server fail:", err.message);
        res.status(500).json({ error: err.message });
    }
}

export const updBorrowRecord = async (req, res) => {
    try {
        await Visitor.findByIdAndUpdate(req.body.id, { $push: {borrowRecord: req.body.borrowedBook}, $inc: {borrow: 1} }, { useFindAndModify: false });
        res.status(200).json(null)
    } catch (err) {
        console.log("server fail:", err.message);
        res.status(500).json({ error: err.message });
    }
}

export const top5Visitors = async (req, res) => {
    try {
        const t5V = await Visitor.find().sort({ borrow: -1 }).limit(5);
        res.status(200).json(t5V);
    } catch (err) {
        console.log("Server fail:", err.message);
        res.status(500).json({ error: err.message });
    }
}