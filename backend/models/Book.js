import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {type: String},
    author: {type: String, required: true},
    description: {type: String, required: true},
    publishBy: {type: String, required: true},
    publishOn: {type: Date, required: true},
    isbn: {type: String, required: true},
    pages: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    status: { type: String, enum: ["Available", "Unavailable"], default: "Available" }
})

const bookModel = mongoose.model('Book', bookSchema)
export {bookModel as Book}