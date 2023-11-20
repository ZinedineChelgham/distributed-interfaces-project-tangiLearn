// routes/monitoring.js
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send({ express: 'Hello From Monitoring' });
});

export default router;