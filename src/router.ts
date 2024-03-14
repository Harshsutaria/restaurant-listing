// importing required modules.
import express from "express";
const router = express.Router();
import productRouter from "./product/product-router";
import userRouter from "./userAuth/userAuthRouter";

// router for users
router.use("/auth", userRouter);

// router for products
// router.use("/products", productRouter);

export default router;
