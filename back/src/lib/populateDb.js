// db.js - Database initialization module
import { Teacher } from "../model/teacher.js";
import { Pupil } from "../model/pupil.js";
import {hashPassword} from "./util.js";

export async function populateDb() {
  const newTeacher = await Teacher.create({
    name: "benten",
    surname: "Weel",
    password: await hashPassword("123"),
    avatar:
      "https://prod.api.assets.riotgames.com/public/v1/asset/lol/13.24.1/CHAMPION/27/ICON",
  });
  console.log("Teacher added to the database");

  const pupils = [
    {
      name: "BelMostache",
      surname: "Habib",
      tokenId: "4",
      isPlaying: false,
      avatar:
        "https://media.licdn.com/dms/image/D4E03AQE47sBZtyc0ww/profile-displayphoto-shrink_100_100/0/1674915952851?e=1709164800&v=beta&t=3UmCfnKdIn4IC206RxzqtJ9a6Efs_JC1p04-D08-2-E",
      teacher: newTeacher._id,
    },
    {
      name: "Chwingum",
      surname: "Zinedine",
      tokenId: "3",
      isPlaying: false,
      avatar:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c8e56cad-0f02-4604-b22e-10e5c641de41/d68p1yf-ddd1e022-2b7b-4229-9ab7-71539f7ce21f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M4ZTU2Y2FkLTBmMDItNDYwNC1iMjJlLTEwZTVjNjQxZGU0MVwvZDY4cDF5Zi1kZGQxZTAyMi0yYjdiLTQyMjktOWFiNy03MTUzOWY3Y2UyMWYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.h67gwNRbIEIN1n3gz71kypoBY3e3igg9Q72cL5Jn-gk",
      teacher: newTeacher._id,
    },
  ];

  const insertedPupils = await Pupil.insertMany(pupils);
  console.log(`${insertedPupils.length} pupils added to the database`);
}