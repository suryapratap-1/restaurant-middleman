import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
        platform: { type: String, enum: ["Zomato", "Swiggy"], required: true },
        orderId: { type: String, required: true, unique: true }, // Platform's order ID
        items: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                externalId: { type: String }, // ID from POS or delivery platform
            },
        ],
        totalAmount: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "accepted", "preparing", "ready", "delivered", "cancelled"],
            required: true
        },
        paymentDetails: {
            method: { type: String, enum: ["cash", "online"], required: true },
            status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
        },
        deliveryDetails: {
            assignedTo: { type: String, default: null }, // Delivery person info
            status: { type: String, enum: ["not_assigned", "assigned", "delivering", "completed"], default: "not_assigned" },
        },
        timestamps: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
