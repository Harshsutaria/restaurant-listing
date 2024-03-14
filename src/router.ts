// importing required modules.
import express from "express";
const router = express.Router();
import businessRouter from "./business/businessRouter";
import userRouter from "./userAuth/userAuthRouter";
import reviewsRouter from "./reviews/reviewsRouter";

// router for users
router.use("/auth", userRouter);

// router for reviews
router.use("/business/reviews", reviewsRouter);

// router for business
router.use("/business", businessRouter);

export default router;
