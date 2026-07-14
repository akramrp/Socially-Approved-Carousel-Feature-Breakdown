import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const dbPath = path.resolve('server/data/videos.json');
async function readVideos() { return JSON.parse(await readFile(dbPath, 'utf8')); }
async function writeVideos(videos) { await writeFile(dbPath, `${JSON.stringify(videos, null, 2)}\n`); }
export async function listVideos() { return readVideos(); }
export async function incrementMetric(videoId, metric) {
  const videos = await readVideos();
  const video = videos.find((item) => item.id === videoId);
  if (!video) return null;
  video[metric] += 1;
  await writeVideos(videos);
  return video;
}
