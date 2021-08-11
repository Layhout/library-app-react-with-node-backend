import Card from "../models/card.js";

export const allCards = async (req, res) => {
    try {
        const cards = await Card.find().sort({ createdAt: -1 });
        res.status(200).json(cards);
    } catch (err) {
        console.log("Fetch cards fail:", err.message);
        res.status(500).json(null);
    }
}

export const addCard = async (req, res) => {
    try {
        const newCard = new Card(req.body);
        const addedCard = await newCard.save();
        res.status(200).json(addedCard);
    } catch (err) {
        console.log("Sevrer failure:", err.message);
        res.status(500).json(null);
    }
}

export const returnCard = async (req, res) => {
    try {
        const updC = await Card.findByIdAndUpdate(req.body.id, { rDate: req.body.rDate }, { useFindAndModify: false, new: true });
        res.status(200).json(updC);
    } catch (err) {
        console.log("Sevrer failure:", err.message);
        res.status(500).json(null);
    }
}