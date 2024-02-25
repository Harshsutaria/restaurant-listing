import express from "express";
import handler from "./user-handler";

const profileRouter = express.Router();

profileRouter.post("/", handler.create);
profileRouter.put("/:userId", handler.update);

export default profileRouter;
