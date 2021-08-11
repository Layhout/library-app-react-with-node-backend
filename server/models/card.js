import mongoose from "mongoose"

const cardSchema = mongoose.Schema({
    visitorId: {
        type: String,
        required: true,
    },
    visitor: {
        type: String,
        required: true,
    },
    bookId: {
        type: String,
        required: true,
    },
    book: {
        type: String,
        required: true,
    },
    bDate: {
        type: String,
        required: true,
    },
    rDate: {
        type: String,
        default: "",
    },
},
    {
        versionKey: false,
        timestamps: true,
    });

export default mongoose.model("card", cardSchema);