// importing required modules.
import express from "express";
const router = express.Router();
import productRouter from "./product/product-router";

router.use("/products", productRouter);

export default router;
