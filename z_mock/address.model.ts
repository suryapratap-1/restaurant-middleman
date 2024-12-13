import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
    location: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postal_code: { type: String, required: true },
    geo_longitude: { type: Number, required: true },
    geo_latitude: { type: Number, required: true },
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);
export default Address;