import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    tags: {
        type: [String],
        // enum: ["Vegetarian", "Non-Vegetarian", "Vegan"],
        default: [],
    },
    estimated_preparation_time: { type: Number, required: true },
    image_url: { type: String },
    external_id: { type: String }, // ID from delivery platform or POS
});

const Item = mongoose.model("Item", itemSchema);
export default Item;