import Visitor from "../models/visitor.js";

export const allVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find().sort({ name: 1 });
        if (visitors) {
            res.status(200).json(visitors);
        }
    } catch (err) {
        console.log("Fetch visitors fail:", err.message);
        res.status(500).json({ errMsg: err.message });
    }
}

export const addVisitor = async (req, res) => {
    try {
        const foundV = await Visitor.findOne({ name: req.body.name });
        if (foundV) {
            res.status(409).json({ msg: "visitor already exists" });
            return;
        }
        const newVisitor = new Visitor({ ...req.body, name: req.body.name.trim().toLowerCase() });
        const addedVisitor = await newVisitor.save();
        if (addedVisitor) {
            res.status(201).json(addedVisitor);
        }
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