import express from "express";
import handler from "./reviewsHandler";

const reviewsRouter = express.Router();

reviewsRouter.get("/", handler.getAll);
reviewsRouter.post("/", handler.create);
reviewsRouter.put("/:reviewId", handler.update);
reviewsRouter.get("/:reviewId", handler.get);
reviewsRouter.delete("/:reviewId", handler.delete);

export default reviewsRouter;
