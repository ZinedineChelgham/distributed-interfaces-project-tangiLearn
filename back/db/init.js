// db.js - Database initialization module
import mongoose from "mongoose";
import { Teacher } from "../src/model/teacher.js";
import { Pupil } from "../src/model/pupil.js";

async function populateDb() {
  const newTeacher = await Teacher.create({
    name: "John",
    surname: "Doe",
    password: "123",
  });
  console.log("Teacher added to the database");

  const pupils = [
    { name: "John", surname: "Doe", tokenId: "123", teacher: newTeacher._id },
    {
      name: "Jane",
      surname: "Smith",
      tokenId: "456",
      teacher: newTeacher._id,
    },
  ];

  const insertedPupils = await Pupil.insertMany(pupils);
  console.log(`${insertedPupils.length} pupils added to the database`);
}

export { populateDb };
