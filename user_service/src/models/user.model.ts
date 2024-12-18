// import mongoose, { Document, Model } from "mongoose";
// // import argon2 from "argon2";

// export interface IUser {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string; // Password is optional after hashing
//     phone: string;
//     profilePicture?: string;
//     isActive?: boolean;
//     role: "super_admin" | "admin" | "manager" | "staff";
//     restaurantId: mongoose.Types.ObjectId;
//     createdAt?: Date;
//     updatedAt?: Date;
// }

// // Define the User document interface (extends IUser and adds Mongoose properties)
// interface IUserDocument extends IUser, Document { }

// // Define the User model interface (adds static methods if needed)
// interface IUserModel extends Model<IUserDocument> { }

// const userSchema = new mongoose.Schema<IUserDocument>(
//     {
//         firstName: { type: String, required: true },
//         lastName: { type: String, required: true },
//         email: { type: String, required: true, unique: true },
//         password: { type: String, required: true },
//         phone: { type: String, required: true },
//         profilePicture: { type: String },
//         isActive: { type: Boolean, default: false },
//         role: {
//             type: String,
//             enum: ["super_admin", "admin", "manager", "staff"],
//             required: true,
//         },
//         restaurantId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Store",
//         },
//     },
//     { timestamps: true }
// );

// // // Add pre-save middleware for password hashing
// // userSchema.pre<IUserDocument>("save", async function (next) {
// //     if (!this.isModified("password")) return next();
// //     try {
// //         this.password = await argon2.hash(this.password);
// //         next();
// //     } catch (error) {
// //         if (error instanceof Error) { // Type guard
// //             next(error);
// //         } else {
// //             // Handle the case where the error is NOT an Error object
// //             console.error("Unexpected error type:", error); // Log for debugging
// //             next(new Error("An unexpected error occurred during password hashing.")); // Create a generic Error
// //         }
// //     }
// // });

// const User = mongoose.model<IUserDocument, IUserModel>("User", userSchema);

// export default User;

import mongoose, { Document, Model } from "mongoose";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string; // Password is optional after hashing
    phone: string;
    profilePicture?: string;
    isActive?: boolean;
    role: "super_admin" | "admin" | "manager" | "staff";
    restaurantId: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the User document interface (extends IUser and adds Mongoose properties)
interface IUserDocument extends IUser, Document { }

// Define the User model interface (adds static methods if needed)
interface IUserModel extends Model<IUserDocument> { }

const userSchema = new mongoose.Schema<IUserDocument>(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minlength: [2, "First name must be at least 2 characters long"]
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            minlength: [2, "Last name must be at least 2 characters long"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,  // Set to true instead of array
            match: [
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                "Please provide a valid email address"
            ]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"]
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            validate: {
                validator: (value: string) => /^[0-9]{10,15}$/.test(value),
                message: "Phone number must be between 10 to 15 digits"
            }
        },
        profilePicture: {
            type: String,
            validate: {
                validator: (value: string) => !value || /^https?:\/\/[^\s]+$/.test(value),
                message: "Profile picture must be a valid URL"
            }
        },
        isActive: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: ["super_admin", "admin", "manager", "staff"],
            required: [true, "Role is required"]
        },
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
        },
    },
    { timestamps: true }
);

const User = mongoose.model<IUserDocument, IUserModel>("User", userSchema);

export default User;
