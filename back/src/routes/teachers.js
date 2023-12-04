import express from "express";
import { Teacher } from "../model/teacher.js";
import { hashPassword } from "../lib/util.js";

const router = express.Router();

router.get("/", (req, res) =>
  Teacher.find().then((teachers) => {
    res.send(teachers);
  }),
);

router.get("/:id", (req, res) =>
  Teacher.findById(req.params.id).then((teacher) => {
    res.send(teacher);
  }),
);

router.post("/", (req, res) =>
  hashPassword(req.body.password).then((hashPassword) =>
    Teacher.create({
      ...req.body,
      password: hashPassword,
    }).then((teacher) => {
      res.send(teacher);
    }),
  ),
);

export default router;
