import express from "express";
import { Pupil } from "../model/pupil.js";

const router = express.Router();

router.get("/", (req, res) =>
  Pupil.find().then((pupils) => {
    res.send(pupils);
  }),
);

router.get("/:id", (req, res) =>
  Pupil.findById(req.params.id).then((pupil) => {
    res.send(pupil);
  }),
);

router.post("/", (req, res) =>
  Pupil.create(req.body).then((pupil) => {
    res.send(pupil);
  }),
);

router.put("/:id", (req, res) =>
  Pupil.findByIdAndUpdate(req.params.id, req.body).then((pupil) => {
    res.send(pupil);
  }),
);

export default router;
