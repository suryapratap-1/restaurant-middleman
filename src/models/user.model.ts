import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["super_admin", "admin", "manager", "staff"],
            required: true
        },
        profile_picture: {
            type: String  
        },
        is_active: {
            type: Boolean,
            default: false
        },
        restaurant_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant"
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
