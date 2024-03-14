import express from "express";
import handler from "./businessHandler";

const businessRouter = express.Router();

businessRouter.get("/", handler.getAll);
businessRouter.post("/", handler.create);
businessRouter.put("/:businessId", handler.update);
businessRouter.get("/:businessId", handler.get);
businessRouter.delete("/:businessId", handler.delete);

export default businessRouter;
