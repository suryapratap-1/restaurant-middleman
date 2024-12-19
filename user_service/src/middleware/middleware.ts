import jwt from "jsonwebtoken";
import { config } from "../config/variables.config";
import { verifyToken } from "../utils/auth.utils";

export const authenticateToken = (req: any, res: any, next: any) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is required.' });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret as string);
        req.user = decoded; // Pass decoded user data to the next middleware
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token." });
    }
};

export const authorizeStore = (req: any, res: any, next: any) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is required.' });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided." });

    try {
        const isValid = verifyToken(token);
        console.log("isValid", isValid);
        if (!isValid) throw new Error("Token is invalid.");
        next();
    }
    catch (error: any) {
        return res.status(403).json({ message: error.message });
    }
};