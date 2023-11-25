import "dotenv/config";
import express from "express";
import monitoringRoutes from "./routes/monitoring.js";
import pipeGameRoutes from "./routes/pipeGame.js";
import towerGameRoutes from "./routes/towerGame.js";
import teacherRoutes from "./routes/teachers.js";
import mongoose from "mongoose";

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// Create Express app
const app = express();

// Registering routes
app.use("/api/monitoring", monitoringRoutes);
app.use("/api/pipe-game", pipeGameRoutes);
app.use("/api/tower-game", towerGameRoutes);
app.use("/api/teacher", teacherRoutes);

// Serve at localhost:3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
