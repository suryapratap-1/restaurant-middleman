import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    user_name: { type: String, required: true },
    platform: { type: String, enum: ["Zomato", "Swiggy"], required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
}, { timestamps: true });

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;