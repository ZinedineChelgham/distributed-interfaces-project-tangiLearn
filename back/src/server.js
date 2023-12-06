import "dotenv/config";
import express from "express";
import monitoringRoutes from "./routes/monitoring.js";
import pipeGameRoutes from "./routes/pipeGame.js";
import towerGameRoutes from "./routes/towerGame.js";
import teacherRoutes from "./routes/teachers.js";
import pupilRoutes from "./routes/pupils.js";
import mongoose from "mongoose";
import cors from "cors";




// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

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

// Serve at localhost:3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
