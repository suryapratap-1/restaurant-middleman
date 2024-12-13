import { Router } from "express";
import { createOrder } from "../controller/order.controler";

export const orderRouter = Router();

orderRouter.route("/").post(createOrder)