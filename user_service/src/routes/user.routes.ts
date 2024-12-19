import { Router } from "express";
import { registerUser, loginUser, logoutUser, updateUser, generateStoreToken } from "../controllers/user.controller";
import { authenticateToken } from "../middleware/middleware";

export const authRouter = Router();

authRouter.route("/register").post(registerUser)
authRouter.route("/login").post(loginUser)
authRouter.route("/logout").get(authenticateToken, logoutUser)
authRouter.route("/profile/:id").patch(authenticateToken, updateUser)

// store
authRouter.route("/store/generate-token").post(generateStoreToken)