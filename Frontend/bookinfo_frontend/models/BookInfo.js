import mongoose, { Schema } from "mongoose";


const BookInfoSchema = new mongoose.Schema({
    title: { type: String, required: true, maxLength: 100 },
    isbn: { type: String, required: true },
    qty: { type: Number, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true }
});

export default mongoose.models.Bookinfo ||
	mongoose.model("Bookinfo", BookInfoSchema);
