import express from "express";
import { Teacher } from "../model/teacher.js";
import { hashPassword, comparePassword } from "../lib/util.js";

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

// Login route
router.post("/login", (req, res) => {
    const { name, password } = req.body;
    console.log(name.toLocaleLowerCase())
    Teacher.findOne({ name: name.toLocaleLowerCase() })
        .then((teacher) => {
            if (!teacher) {
                return res.status(404).send('Teacher not found');
            }

            comparePassword(password, teacher.password)
                .then(isMatch => {
                    if (isMatch) {
                        // Login successful, handle session or token creation here
                        res.send(teacher);
                    } else {
                        res.status(401).send('Invalid password');
                    }
                })
                .catch(err => res.status(500).send('Error in password comparison'));
        })
        .catch(err => res.status(500).send('Error in finding teacher'));
});

export default router;
