import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
    {
        restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
        categories: [
            {
                name: { type: String, required: true, unique: true },
                items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true }],
            },
        ],
        lastSyncedAt: { type: Date, default: null }, // Tracks POS sync timestamp
    },
    { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
