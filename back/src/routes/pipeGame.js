// routes/pipeGame.js
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send({ status: 'Pipe Game is running' });
});

export default router;
