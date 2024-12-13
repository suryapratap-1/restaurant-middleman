import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller";
import { authenticateToken } from "../middleware/middleware";

export const authRouter = Router();

authRouter.route("/register").post(registerUser)
authRouter.route("/login").post(loginUser)
authRouter.route("/logout").get(authenticateToken, logoutUser)