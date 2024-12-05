import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
    {
        restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
        categories: [
            {
                name: { type: String, required: true },
                items: [
                    {
                        name: { type: String, required: true },
                        price: { type: Number, required: true },
                        availability: { type: Boolean, default: true },
                        externalId: { type: String }, // ID from delivery platform or POS
                    },
                ],
            },
        ],
        lastSyncedAt: { type: Date, default: null }, // Tracks POS sync timestamp
    },
    { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
