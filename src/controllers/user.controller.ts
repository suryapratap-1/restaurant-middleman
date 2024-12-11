import argon2 from "argon2";
import User from "../models/user.model";
import Store from "../models/store.model";
import jwt from "jsonwebtoken";
import { config } from "../config/variables.config";

export const registerUser = async (req: any, res: any) => {
    const {
        firstName,
        lastName,
        email,
        password,
        phone,
        profile_picture = null, // Default to null if not provided
        role,
        storeDetails, // Only for managers
    } = req.body;

    try {
        // Step 1: Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        // Step 2: Ensure the role is provided
        if (!role) {
            return res.status(400).json({ message: "Role is required." });
        }

        // Step 3: Ensure all required fields are provided
        if (!firstName || !lastName || !email || !password || !phone) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Step 4: Hash the password
        const hashedPassword = await argon2.hash(password);

        // Step 5: Role-based registration process
        if (role === "manager") {
            // Validate storeDetails
            if (
                !storeDetails ||
                !storeDetails.storeName ||
                !storeDetails.openTime ||
                !storeDetails.closeTime ||
                !storeDetails.partnerWith ||
                !storeDetails.notificationPhone
            ) {
                return res.status(400).json({
                    message: "All store fields are required for the manager role.",
                });
            }

            // Create the user and store in a transaction
            const user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone,
                profile_picture,
                role,
            });

            const store = new Store({
                storeName: storeDetails.storeName,
                userDetails: user._id,
                address: storeDetails.address,
                notificationPhone: storeDetails.notificationPhone,
                openTime: storeDetails.openTime,
                closeTime: storeDetails.closeTime,
                holidayList: storeDetails.holidayList || [],
                partnerWith: storeDetails.partnerWith,
                partnerReferenceId: storeDetails.partnerReferenceId,
                deliveryRange: storeDetails.deliveryRange || 0,
                storeStatus: storeDetails.storeStatus || "active",
                translation: storeDetails.translation || [],
            });

            const session = await User.startSession();
            session.startTransaction();
            try {
                user.restaurant_id = store._id;
                await user.save({ session });
                store.userDetails = user._id;
                await store.save({ session });
                await session.commitTransaction();
                session.endSession();
                return res.status(201).json({ message: "Manager and store registered successfully." });
            } catch (err) {
                await session.abortTransaction();
                session.endSession();
                throw err;
            }
        } 
        else if (["super_admin", "admin"].includes(role)) {
            // Create the user without store details
            const user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                phone,
                profile_picture,
                role,
            });

            await user.save();
            return res.status(201).json({ message: "User registered successfully." });
        } 
        else {
            return res.status(400).json({ message: "Invalid role provided." });
        }
    } 
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error." });
    }
};

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
        const isPasswordValid = await argon2.verify(user.password, password);
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
