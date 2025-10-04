// models/book.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    persons: { type: Number, required: true },
    food: { type: String },
    timing: { type: String, required: true },
    date: { type: String, required: true },
    occasion: { type: String },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

const BOOK = mongoose.model("BOOK", bookSchema);
export default BOOK;
