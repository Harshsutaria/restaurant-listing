// importing required modules.
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("INSIDE ROUTER.TS FILE BRUH!!!!");
  return res.json({
    code: 200,
    message: "Hello from express router",
  });
});

export default router;
