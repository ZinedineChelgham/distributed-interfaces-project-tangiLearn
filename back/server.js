// app.js
import express from 'express';
import monitoringRoutes from './routes/monitoring.js';
import pipeGameRoutes from './routes/pipeGame.js';

const app = express();

// Registering routes
app.use('/api/monitoring', monitoringRoutes);
app.use('/api/pipe-game', pipeGameRoutes);

// Serve at localhost:3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
