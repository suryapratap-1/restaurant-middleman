import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderId: { type: String, required: true, unique: true }, // Platform's order ID
        externalId: { type: String, required: true },
        restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
        items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true }],
        menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true }],
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        orderStatus: {
            type: String,
            enum: ["accepted", "cancelled", "pending"],
            default: "pending",
        },
        delivery_partner: {
            type: String,
            enum: ["Zomato", "Swiggy"],
            required: true
        },
        deliveryPerson: {
            personName: { type: String },
            personPhone: { type: String },
        },
        deliveryStatus: {
            type: String,
            enum: ["not_assigned", "assigned", "delivering", "completed"],
            default: "not_assigned",
        },
        deliveryTimeEstimated: { type: Number, default: null }, // in minutes
        deliveryAddress: {
            location: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
            geo_longitude: { type: Number },
            geo_latitude: { type: Number },
        },
        pickupTime: { type: Date, default: null },
        customerDetails: {
            customerName: { type: String, required: true },
            customerPhone: { type: String, required: true },
        },
        paymentDetails: {
            paymentMethod: { type: String, enum: ["cash", "online"], required: true },
            paymentGateway: { type: String },
            paymentStatus: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
            cardHolderName: { type: String },
            cardNumber: { type: Number },
            cardExpiry: { type: Number },
            cardCVV: { type: Number },
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
