import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, required: true, unique: true },
        profile_picture: { type: String },
        is_active: { type: Boolean, default: false },
        role: {
            type: String,
            enum: ["super_admin", "admin", "manager", "staff"],
            required: true
        },
        restaurant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store"
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
