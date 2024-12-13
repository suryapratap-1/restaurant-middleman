import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
        order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
        user_details: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
        },
        delivery_partner: { type: String, enum: ["Zomato", "Swiggy"], required: true },
        payment_gateway: { type: String },
        paymentDetails: {
            totalAmount: { type: Number, required: true },
            platformFee: { type: Number, required: true },
            netPayout: { type: Number, required: true },
            status: { type: String, enum: ["pending", "paid"], default: "pending" },
        },
        reconciliationStatus: { type: String, enum: ["pending", "verified", "disputed"], default: "pending" },
        reconciledAt: { type: Date, default: null },
    },
    { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
