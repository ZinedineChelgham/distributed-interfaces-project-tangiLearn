import "dotenv/config";
import express from "express";
import monitoringRoutes from "./routes/monitoring.js";
import pipeGameRoutes from "./routes/pipeGame.js";
import towerGameRoutes from "./routes/towerGame.js";
import teacherRoutes from "./routes/teachers.js";
import pupilRoutes from "./routes/pupils.js";
import mongoose from "mongoose";
import cors from "cors";
import { populateDb } from "./lib/populateDb.js";
import { PORT } from "./lib/config.js";
import path from "path";
import morgan from "morgan";

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", async () => {
  console.log("Connected to Database");
  // Populate database with initial data
  await db.dropDatabase();
  console.log("Database dropped");
  await populateDb();
});

// Create Express app
const app = express();

// Logging
app.use(morgan("dev"));

// Allow Express to understand JSON
app.use(express.json());
app.use(cors());

// Registering routes
app.use("/api/monitoring", monitoringRoutes);
app.use("/api/pipe-game", pipeGameRoutes);
app.use("/api/tower-game", towerGameRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/pupil", pupilRoutes);

for (let dir of [
  "entry-menu",
  "pipe-game",
  "tower-game",
  "token-registration",
]) {
  if (dir === "tower-game") {
    dir = "jeu-des-tours";
  }
  app.use(`/${dir}/assets`, express.static(`./fronts/${dir}/assets`));
  app.get(`/${dir}*`, (req, res, next) => {
    const filePath = req.url
      .substring(req.url.lastIndexOf("/") + 1)
      .split("?")[0];
    if (filePath === "" || !filePath.includes(".")) {
      return next();
    }
    try {
      const file = path.resolve(path.dirname(""), `./fronts/${dir}`, filePath);
      res.sendFile(file);
    } catch (error) {
      console.error(error);
      next();
    }
  });

  app.use(`/${dir}*`, express.static(`./fronts/${dir}`));
}

// Serve at localhost:3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
