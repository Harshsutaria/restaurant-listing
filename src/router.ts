// importing required modules.
import express from "express";
const router = express.Router();
import productRouter from "./product/product-router";
import userRouter from "./user/user-router";

// router for users
router.use("/user", userRouter);

// router for products
router.use("/products", productRouter);

export default router;
