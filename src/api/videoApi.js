import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000', timeout: 8000 });

export const getVideos = async () => (await api.get('/videos')).data;
export const likeVideo = async ({ videoId, userId }) => (await api.post('/like', { videoId, userId })).data;
export const shareVideo = async ({ videoId, platform }) => (await api.post('/share', { videoId, platform })).data;
