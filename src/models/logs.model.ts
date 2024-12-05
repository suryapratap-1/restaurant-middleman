import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
    {
        event: { type: String, required: true }, // e.g., "menu_sync", "order_update"
        restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
        platform: { type: String, enum: ["Zomato", "Swiggy"], required: true },
        details: { type: mongoose.Schema.Types.Mixed, required: true }, // JSON for event-specific data
        status: { type: String, enum: ["success", "error"], required: true },
        errorMessage: { type: String, default: null },
        timestamp: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);
export default Log;
