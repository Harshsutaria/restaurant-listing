// importing required modules.
import express from "express";
const router = express.Router();
import productRouter from "./product/product-router";
import userRouter from "./user/user-router";
import orderRouter from "./order/order-router";

// router for users
router.use("/user", userRouter);

// router for products
router.use("/products", productRouter);

// router for orders
router.use("/orders",orderRouter)

export default router;
