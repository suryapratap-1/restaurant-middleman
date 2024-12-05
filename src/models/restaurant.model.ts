import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: {
            geo_longitude: { type: Number, required: true },
            geo_latitude: { type: Number, required: true },
        },
        contact: { type: String, required: true },
        posSystem: { type: String, required: true }, // e.g., "Square", "Toast"
        deliveryPlatforms: [
            {
                platform: { type: String, enum: ["Zomato", "Swiggy"], required: true },
                apiKey: { type: String, required: true },
                integrationStatus: { type: Boolean, default: true },
                webhookUrl: { type: String }, // URL for receiving platform updates
            },
        ],
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
