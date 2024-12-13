import jwt from "jsonwebtoken";
import { config } from "../config/variables.config";

export const authenticateToken = (req: any, res: any, next: any) => {
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
