import express from "express";
import handler from "./product-handler";

const productRouter = express.Router();

productRouter.get("/", handler.getAll);
productRouter.post("/", handler.create);
productRouter.put("/:productId", handler.update);
productRouter.get("/:productId", handler.get);
productRouter.delete("/:productId", handler.delete);

export default productRouter;
