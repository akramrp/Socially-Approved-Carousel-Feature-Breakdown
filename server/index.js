import cors from 'cors';
import express from 'express';
import { videoRouter } from './routes/videoRoutes.js';

const app = express();
const port = process.env.PORT ?? 4000;

app.use(cors());
app.use(express.json());
app.use(videoRouter);
app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ error: 'Internal server error' }); });
app.listen(port, () => console.log(`Video API listening on http://localhost:${port}`));
