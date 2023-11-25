import express from "express";
import { Teacher } from "../model/teacher.js";

const router = express.Router();

router.get("/", (req, res) =>
  Teacher.find().then((teachers) => {
    res.send(teachers);
  }),
);

export default router;
