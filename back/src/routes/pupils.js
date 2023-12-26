import express from "express";
import { Pupil } from "../model/pupil.js";

const router = express.Router();

router.get("/", (req, res) => {
  Pupil.find().then((pupils) => {
    res.send(pupils);
  });
});

router.get("/:id", (req, res) =>
  Pupil.findById(req.params.id).then((pupil) => {
    res.send(pupil);
  }),
);

router.post("/", (req, res) => {
  console.log("POST request received at /api/pupil/");
  Pupil.create(req.body).then((pupil) => {
    console.log(pupil, "created");
    res.send(pupil);
  });
});

router.put("/:id", (req, res) => {
  console.log("PUT request received at /api/pupil/" + req.params.id);
  console.log(req.body);
  Pupil.findByIdAndUpdate(req.params.id, req.body).then((pupil) => {
    console.log(pupil, "updated");
    res.send(pupil);
  });
  ////
});

export default router;
