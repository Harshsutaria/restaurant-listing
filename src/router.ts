// importing required modules.
import express from "express";
const router = express.Router();
import businessRouter from "./business/businessRouter";
import userRouter from "./userAuth/userAuthRouter";

// router for users
router.use("/auth", userRouter);

// router for business
router.use("/business", businessRouter);

export default router;
