import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller";
import { authenticateToken } from "../middleware/middleware";
export const userRouter = Router();

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").get(authenticateToken, logoutUser)