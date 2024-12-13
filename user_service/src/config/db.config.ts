import mongoose from "mongoose";
import { config } from "./variables.config";

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};