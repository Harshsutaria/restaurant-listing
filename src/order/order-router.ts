import express from "express";
import handler from "./order-handler";

const orderRouter = express.Router();

// create a order
orderRouter.post("/", handler.create);
// update a order
orderRouter.put("/:orderId", handler.update);

export default orderRouter;
