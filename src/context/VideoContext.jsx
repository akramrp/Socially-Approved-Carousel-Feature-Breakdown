import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { getVideos, likeVideo, shareVideo } from '../api/videoApi.js';

const VideoContext = createContext(null);
const initialState = { videos: [], loading: true, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'loaded': return { videos: action.videos, loading: false, error: null };
    case 'failed': return { ...state, loading: false, error: action.error };
    case 'patch': return { ...state, videos: state.videos.map((v) => (v.id === action.videoId ? { ...v, ...action.patch } : v)) };
    default: return state;
  }
}

export function VideoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let cancelled = false;
    getVideos().then((videos) => !cancelled && dispatch({ type: 'loaded', videos })).catch(() => !cancelled && dispatch({ type: 'failed', error: 'Unable to load videos.' }));
    return () => { cancelled = true; };
  }, []);

  const optimisticLike = useCallback(async (videoId) => {
    const current = state.videos.find((v) => v.id === videoId);
    if (!current) return;
    dispatch({ type: 'patch', videoId, patch: { likes: current.likes + 1 } });
    try { await likeVideo({ videoId, userId: 'demo-user' }); }
    catch { dispatch({ type: 'patch', videoId, patch: { likes: current.likes } }); }
  }, [state.videos]);

  const recordShare = useCallback(async (videoId, platform = 'native') => {
    const current = state.videos.find((v) => v.id === videoId);
    if (!current) return;
    dispatch({ type: 'patch', videoId, patch: { shares: current.shares + 1 } });
    try { await shareVideo({ videoId, platform }); }
    catch { dispatch({ type: 'patch', videoId, patch: { shares: current.shares } }); }
  }, [state.videos]);

  const value = useMemo(() => ({ ...state, optimisticLike, recordShare }), [state, optimisticLike, recordShare]);
  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
}

export const useVideos = () => useContext(VideoContext);
