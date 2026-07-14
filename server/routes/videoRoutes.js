import { Router } from 'express';
import { getVideos, likeVideo, shareVideo } from '../controllers/videoController.js';

export const videoRouter = Router();
videoRouter.get('/videos', getVideos);
videoRouter.post('/like', likeVideo);
videoRouter.post('/share', shareVideo);
