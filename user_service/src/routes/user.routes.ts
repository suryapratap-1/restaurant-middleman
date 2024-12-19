import { Router } from "express";
import { registerUser, loginUser, logoutUser, updateUser, generateStoreToken, updateStore } from "../controllers/user.controller";
import { authenticateToken, authorizeStore } from "../middleware/middleware";

export const authRouter = Router();

authRouter.route("/register").post(registerUser)
authRouter.route("/login").post(loginUser)
authRouter.route("/logout").get(authenticateToken, logoutUser)
authRouter.route("/profile/:id").patch(authenticateToken, updateUser)

// store
authRouter.route("/store/generate-token").post(generateStoreToken)
authRouter.route("/store/:id").patch(authorizeStore, updateStore)