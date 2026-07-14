import { incrementMetric, listVideos } from '../models/videoStore.js';

export async function getVideos(_req, res, next) { try { res.json(await listVideos()); } catch (error) { next(error); } }
export async function likeVideo(req, res, next) {
  try {
    const { videoId, userId } = req.body;
    if (!videoId || !userId) return res.status(400).json({ error: 'videoId and userId are required' });
    const video = await incrementMetric(videoId, 'likes');
    return video ? res.json(video) : res.status(404).json({ error: 'Video not found' });
  } catch (error) { return next(error); }
}
export async function shareVideo(req, res, next) {
  try {
    const { videoId, platform } = req.body;
    if (!videoId || !platform) return res.status(400).json({ error: 'videoId and platform are required' });
    const video = await incrementMetric(videoId, 'shares');
    return video ? res.json(video) : res.status(404).json({ error: 'Video not found' });
  } catch (error) { return next(error); }
}
