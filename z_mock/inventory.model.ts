import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
    {
        restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
        category: { type: String, required: true },
        items: [
            {
                // itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
                name: { type: String, required: true },
                stock: { type: Number, required: true },
                outOfStock: { type: Boolean, default: false },
                lowStockThreshold: { type: Number, default: 10 },
                externalId: { type: String }, // ID for integration with platforms
            },
        ],
        lastSyncedAt: { type: Date, default: null },
    },
    { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
