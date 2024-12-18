import mongoose from "mongoose";
import argon2 from "argon2";
import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import { config } from "../config/variables.config";
import { createAdminOrSuperAdmin, createManagerOrStaff } from "../service/user.services";
import { verifyPassword } from "../utils/argon2.utils";


export const registerUser = async (req: any, res: any) => {
    const { role } = req.body;
    if (!role) return res.status(400).json({ success: false, message: "Role is required to register." })

    try {
        let user: any;

        if (['admin', 'super_admin'].includes(role)) {
            // User type 1: Admin or Super Admin
            user = await createAdminOrSuperAdmin(req.body);

            const userObject = user.toObject();
            delete userObject.password;

            return res.status(201).json({
                success: true,
                message: `${role} registered successfully.`,
                userObject
            });
        }

        if (['manager', 'staff'].includes(role)) {
            // User type 2: Manager or Staff
            user = await createManagerOrStaff(req.body);
            return res.status(201).json({
                success: true,
                message: `${role} and store registered successfully.`,
                user
            });
        }

        return res.status(400).json({ success: false, message: 'Invalid role provided.' });

    } catch (error: any) {
        console.error("Error registering user:", error);
        return res.status(500).json({
            success: false,
            message: "Error registering user.",
            error: error.message
        });
    }
}

export const loginUser = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;

        // 1. Validate if email or password is missing
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // 2. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // 3. Validate password
        // const isPasswordValid = await argon2.verify(user.password, password);
        const isPasswordValid = await verifyPassword(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password." });
        }

        // 4. Generate JWT Token
        const tokenPayload = {
            id: user._id,
            role: user.role,
        };

        const token = jwt.sign(
            tokenPayload,
            config.jwtSecret as string,
            { expiresIn: config.jwtExpiration as string }
        );

        // 5. Set token as a cookie
        res.cookie("accesstoken", token, {
            httpOnly: true, // Prevent client-side JavaScript access
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict", // Prevent CSRF attacks
            maxAge: 3600000, // Cookie expiration time (1 hour)
        });

        // 6. Respond with success message and user info
        return res.status(200).json({
            message: "Login successful.",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export const logoutUser = async (req: any, res: any) => {
    try {
        // Clear the authToken cookie
        res.clearCookie("accesstoken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict",
        });

        // Respond with a success message
        return res.status(200).json({ message: "Logout successful." });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Update User Controller
export const updateUser = async (req: any, res: any) => {
    try {
        const userId: string = req.params.id;
        const { firstName, lastName, email, password, phone, profilePicture, isActive }: Partial<IUser> = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Validate fields
        const updateData: Partial<IUser> = {};
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (email) updateData.email = email;
        if (password) updateData.password = await argon2.hash(password);
        if (phone) updateData.phone = phone;
        if (profilePicture) updateData.profilePicture = profilePicture;
        if (typeof isActive !== "undefined") updateData.isActive = isActive;

        // Ensure role and restaurant_id are not updated
        delete updateData.role;
        delete updateData.restaurantId;

        // Find and update user
        const updatedUser: any = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true } // Return updated document and validate data
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const userObject = updatedUser.toObject();
        delete userObject.password;

        return res.status(200).json({
            message: "User updated successfully",
            data: userObject,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
