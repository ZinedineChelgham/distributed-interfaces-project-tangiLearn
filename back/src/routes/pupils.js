import express from "express";
import { Pupil } from "../model/pupil.js";

const router = express.Router();

router.get("/", (req, res) => {
  const { tokenId } = req.query;
  if (tokenId) {
    return Pupil.findOne({ tokenId: tokenId }).then((pupil) => {
      res.send(pupil);
    });
  } else {
    return Pupil.find().then((pupils) => {
      res.send(pupils);
    });
  }
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
});

router.put("/playing/:tokenId", async (req, res) => {
  try {
    const tokenId = req.params.tokenId;

    // Find the pupil by tokenId and update the isPlaying field to true
    const updatedPupil = await Pupil.findOneAndUpdate(
      { tokenId: tokenId },
      { isPlaying: true },
      { new: true },
    );

    if (!updatedPupil) {
      return res.status(404).json({ message: "Pupil not found" });
    }
    res.json(updatedPupil);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/stop-playing/:tokenId", async (req, res) => {
  try {
    const tokenId = req.params.tokenId;

    // Find the pupil by tokenId and update the isPlaying field to false
    const updatedPupil = await Pupil.findOneAndUpdate(
      { tokenId: tokenId },
      { isPlaying: false },
      { new: true },
    );

    if (!updatedPupil) {
      return res.status(404).json({ message: "Pupil not found" });
    }

    res.json(updatedPupil);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
