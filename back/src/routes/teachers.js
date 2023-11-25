import express from "express";
import {Teacher} from "../model/teacher.js";

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
    Teacher.create(req.body).then((teacher) => {
        res.send(teacher);
    }),
);

export default router;
