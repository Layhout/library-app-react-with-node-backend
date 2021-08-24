import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    img: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    publisher: {
        type: String,
        required: true,
        trim: true,
    },
    genres: {
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

export default mongoose.model("book", bookSchema);