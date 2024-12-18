import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
    location: {
        type: String,
        required: [true, "Location is required"],
        minlength: [2, "Location must be at least 2 characters long"]
    },
    city: {
        type: String,
        required: [true, "City is required"],
        minlength: [2, "City name must be at least 2 characters long"]
    },
    state: {
        type: String,
        required: [true, "State is required"],
        minlength: [2, "State name must be at least 2 characters long"]
    },
    country: {
        type: String,
        required: [true, "Country is required"],
        minlength: [2, "Country name must be at least 2 characters long"]
    },
    postal_code: {
        type: String,
        required: [true, "Postal code is required"],
        validate: {
            validator: (value: string) => /^[0-9]{5,10}$/.test(value),
            message: "Postal code must be a valid numeric code between 5 and 10 digits"
        }
    },
    geo_longitude: {
        type: Number,
        required: [true, "Longitude is required"],
        min: [-180, "Longitude must be greater than or equal to -180"],
        max: [180, "Longitude must be less than or equal to 180"]
    },
    geo_latitude: {
        type: Number,
        required: [true, "Latitude is required"],
        min: [-90, "Latitude must be greater than or equal to -90"],
        max: [90, "Latitude must be less than or equal to 90"]
    },
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);
export default Address;
