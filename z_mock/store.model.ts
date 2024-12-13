import mongoose, { Schema } from "mongoose";

const storeSchema = new Schema(
    {
        storeRegistredId: { type: String },
        storeName: {
            type: String,
            maxlength: 50,
            required: true,
        },
        userDetails: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: "Address",
        },
        notificationPhone: { type: String, required: true },
        openTime: { type: String, required: true },
        closeTime: { type: String, required: true },
        holidayList: { type: [Date], default: [] },
        partnerWith: { type: String, required: true },
        partnerReferenceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliveryPartner",
        },
        deliveryRange: { type: Number, default: 0 },
        storeStatus: { 
            type: String, 
            enum: ["active", "busy"],
            default: "active"
        },
        translation: { type: [String], default: [] },
    },
    { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);
export default Store;
