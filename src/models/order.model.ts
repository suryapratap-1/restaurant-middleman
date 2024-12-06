import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
        order_id: { type: String, required: true, unique: true }, // Platform's order ID
        delivery_partner: { type: String, enum: ["Zomato", "Swiggy"], required: true },
        total_amount: { type: Number, required: true },
        quantity: { type: Number, required: true },
        menu: {
            name: { type: String, required: true },
            externalId: { type: String }, // ID from POS or delivery platform
            items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true }],
        },
        // items: [
        //     {
        //         item_id: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
        //         name: { type: String, required: true },
        //         quantity: { type: Number, required: true },
        //         price: { type: Number, required: true },
        //         externalId: { type: String }, // ID from POS or delivery platform
        //     },
        // ],
        order_status: {
            type: String,
            enum: ["pending", "accepted", "preparing", "ready", "delivered", "cancelled"],
            default: "pending",
        },
        payment_details: {
            method: { type: String, enum: ["cash", "online"], required: true },
            status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
        },
        delivery_details: {
            assignedTo: { type: String, default: null }, // Delivery person info
            status: { type: String, enum: ["not_assigned", "assigned", "delivering", "completed"], default: "not_assigned" },
            delivery_time_estimate: { type: Number, default: null },
            delivery_location: {
                geo_longitude: { type: Number, required: true },
                geo_latitude: { type: Number, required: true },
            }
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
