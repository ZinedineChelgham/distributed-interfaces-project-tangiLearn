import express from "express";

const router = express.Router();

router.get("/teacher", (req, res) => {
  res.send({ express: "Hello From Users" });
});

export default router;
