import Visitor from "../models/visitor.js";

export const allVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find().sort({ name: 1 });
        res.status(200).json(visitors);
    } catch (err) {
        console.log("Fetch visitors fail:", err.message);
        res.status(500).json({ errMsg: err.message });
    }
}

export const addVisitor = async (req, res) => {
    try {
        const allV = await Visitor.find();
        const foundV = allV.find(v => v.name.toLowerCase() === req.body.name.trim().toLowerCase())
        if (foundV) {
            res.status(409).json({ msg: "visitor already exists" });
            return;
        }
        const newVisitor = new Visitor({ ...req.body, name: req.body.name.trim(), borrow: 0 });
        const addedVisitor = await newVisitor.save();
        res.status(201).json(addedVisitor);
    } catch (err) {
        console.log("server fail:", err.message);
        res.status(500).json({ errMsg: err.message });
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
        res.status(500).json({ errMsg: err.message });
    }
}

export const updBorrowRecord = async (req, res) => {
    try {
        const foundV = await Visitor.findById(req.body.id);
        await Visitor.findByIdAndUpdate(req.body.id, { borrowRecord: foundV.borrowRecord.concat(req.body.borrowedBook), borrow: ++foundV.borrow }, { useFindAndModify: false });
        res.status(200).json(null)
    } catch (err) {
        console.log("server fail:", err.message);
        res.status(500).json({ errMsg: err.message });
    }
}

export const top5Visitors = async (req, res) => {
    try {
        const t5V = await Visitor.find().sort({ borrow: -1 }).limit(5);
        res.status(200).json(t5V);
    } catch (err) {
        console.log("Server fail:", err.message);
        res.status(500).json({ errMsg: err.message });
    }
}