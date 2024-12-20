import mongoose from "mongoose";
import argon2 from "argon2";
import User, { IUser } from "../models/user.model";
import Store, { IStore } from "../models/store.model";
import { createAdminOrSuperAdmin, createManagerOrStaff } from "../service/user.services";
import { verifyPassword, generateToken, validateApiKeyAndSecret, validateApiCredentialFields, validateLoginFields, validateMongoObjectId, createStoreUpdatePayload } from "../utils";
import { createAdminUpdatePayload } from "../utils/createPayload";

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

        validateLoginFields(email, password);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        await verifyPassword(user.password, password);

        const tokenPayload = { id: user._id, role: user.role, };
        const token = generateToken(tokenPayload);

        res.cookie("accesstoken", token, {
            httpOnly: true, // Prevent client-side JavaScript access
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict", // Prevent CSRF attacks
            maxAge: 3600000, // Cookie expiration time (1 hour)
        });

        return res.status(200).json({
            message: "Login successful.",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error: any) {
        console.error("Error logging in user:", error.message);

        if (error.message === "Email is required.") {
            return res.status(400).json({ message: "Email is required." });
        }
        if (error.message === "Password is required.") {
            return res.status(400).json({ message: "Password is required." });
        }
        if (error.message === "Invalid password") {
            return res.status(401).json({ message: "Invalid password." });
        }

        return res.status(500).json({
            message: "Login failed, try again later.",
            error: error.message
        });
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

// Update Super admin or admin Controller
export const updateAdminOrSuperAdmin = async (req: any, res: any) => {
    try {
        const userId: string = req.params.id;
        const payload: Partial<IUser> = req.body;

        validateMongoObjectId(userId, "User");

        const updateData = await createAdminUpdatePayload(payload);

        // Ensure role and restaurant_id are not updated
        delete updateData.role;
        delete updateData.restaurantId;

        // Find and update user
        const updatedUser: any = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) throw new Error("User not found");

        const userObject = updatedUser.toObject();
        delete userObject.password;

        return res.status(200).json({
            message: "User updated successfully",
            data: userObject,
        });
    } catch (error: any) {
        console.error("Error updating user:", error);

        if (error.message.includes("required")) {
            return res.status(400).json({ message: error.message });
        }
        if (error.message === "Invalid User ID") {
            return res.status(404).json({ message: "Invalid user ID" })
        }
        if (error.message === "User not found") {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(500).json({ message: "Unable to update user details.", error: error.message })
    }
};

export const generateStoreToken = async (req: any, res: any) => {
    try {
        const { apiKey, apiSecret } = req.body;

        validateApiCredentialFields(apiKey, apiSecret);

        const store = await validateApiKeyAndSecret(apiKey, apiSecret);

        const storeAuthToken = generateToken({ storeRegistredId: store.storeRegistredId });

        return res.status(200).json({
            message: "Store token generated successfully.",
            token: storeAuthToken
        })

    }
    catch (error: any) {
        console.error("Error generating store token:", error.message);

        if (error.message === 'Invalid API key or secret') {
            return res.status(401).json({
                message: "Invalid API credentials.",
            });
        }

        if (error.message.includes('required')) {
            return res.status(400).json({
                message: error.message,
            });
        }

        return res.status(500).json({
            message: "Error generating store auth token.",
            error: error.message,
        });
    }
}

export const updateStore = async (req: any, res: any) => {
    try {
        const storeId: string = req.params.id;
        const inputData: Partial<IStore> = req.body;

        validateMongoObjectId(storeId, "Store");

        const updateData = createStoreUpdatePayload(inputData);
        delete updateData.storeRegistredId;

        const updatedStore = await Store.findByIdAndUpdate(
            storeId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedStore) throw new Error("Store not found");

        return res.status(200).json({
            message: "Store updated successfully",
            data: updatedStore,
        });
    }
    catch (error: any) {
        console.error("Error updating store:", error);

        if (error.message === "Invalid store ID") {
            return res.status(400).json({ message: "Invalid store ID." });
        }
        if (error.message === "Store not found") {
            return res.status(404).json({ message: "Store not found." });
        }
        if (error.message.includes("required")) {
            return res.status(400).json({ message: error.message });
        }

        return res.status(500).json({ message: "Unable to update store details.", error: error.message });
    }
};