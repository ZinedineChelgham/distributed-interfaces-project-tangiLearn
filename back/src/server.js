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

// Allow Express to understand JSON
app.use(express.json());
app.use(cors());

// Registering routes
app.use("/api/monitoring", monitoringRoutes);
app.use("/api/pipe-game", pipeGameRoutes);
app.use("/api/tower-game", towerGameRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/pupil", pupilRoutes);

// entry menu
app.use("/entry-menu/assets", express.static("../entry-menu/dist/assets"));
app.get("/entry-menu", (req, res) => {
  res.sendFile(
    path.resolve(path.dirname(""), "../entry-menu/dist", "index.html"),
  );
});

// pipe game
app.use("/pipe-game/assets", express.static("../pipe-game/dist/assets"));
app.get("/pipe-game", (req, res) => {
  res.sendFile(
    path.resolve(path.dirname(""), "../pipe-game/dist", "index.html"),
  );
});
app.get("/pipe-game/*", (req, res) => {
  res.sendFile(
    path.resolve(path.dirname(""), "../pipe-game/dist", "index.html"),
  );
});

// tower game
app.use("/tower-game/assets", express.static("../tower-game/dist/assets"));
app.get("/tower-game", (req, res) => {
  res.sendFile(
    path.resolve(path.dirname(""), "../tower-game/dist", "index.html"),
  );
});

// token registration
app.use(
  "/token-registration/assets",
  express.static("../token-registration/dist/assets"),
);
app.get("/token-registration", (req, res) => {
  res.sendFile(
    path.resolve(path.dirname(""), "../token-registration/dist", "index.html"),
  );
});

// Serve at localhost:3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
