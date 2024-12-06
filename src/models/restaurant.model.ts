import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        registration_number: { type: String, required: true },
        pos_system: { type: String, required: true }, // e.g., "Square", "Toast"
        address: {
            geo_longitude: { type: Number, required: true },
            geo_latitude: { type: Number, required: true },
        },
        owner: {
            name: { type: String, required: true },
            phone: { type: String, required: true },
            email: { type: String, required: true },  
        },
        restaurant_contact: {
            phone: { type: String, required: true },
            email: { type: String, required: true },
            website_url: { type: String, required: true },
        },
        operational_details: {
            opening_time: { type: String, required: true },
            closing_time: { type: String, required: true },
            holidays_list: { type: [Date], default: [] },
        },
        delivery_partners: [
            {
                platform: { type: String, enum: ["Zomato", "Swiggy"], required: true },
                apiKey: { type: String, required: true },
                integrationStatus: { type: Boolean, default: true },
                webhookUrl: { type: String }, // URL for receiving platform updates
            },
        ],
        profile_picture: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
