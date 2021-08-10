import mongoose from "mongoose";

const visitorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    borrowRecord: {
        type: Array,
        dafault: [],
    },
    borrow: {
        type: Number,
        defualt: 0,
    }
},
    {
        versionKey: false,
    }
);

export default mongoose.model("visitor", visitorSchema);