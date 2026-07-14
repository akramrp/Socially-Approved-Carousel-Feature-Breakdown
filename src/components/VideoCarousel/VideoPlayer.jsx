import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useIntersectionVideo } from '../../hooks/useIntersectionVideo.js';
import styles from './VideoCarousel.module.css';

export const VideoPlayer = memo(function VideoPlayer({ video, active }) {
  const shellRef = useRef(null);
  const videoRef = useRef(null);
  const visible = useIntersectionVideo(shellRef);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const shouldLoad = visible || active;

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    if (active && visible) node.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else { node.pause(); setPlaying(false); }
  }, [active, visible, shouldLoad]);

  useEffect(() => () => {
    const node = videoRef.current;
    if (node) { node.pause(); node.removeAttribute('src'); node.load(); }
  }, []);

  const togglePlay = useCallback(() => {
    const node = videoRef.current;
    if (!node) return;
    if (node.paused) node.play().then(() => setPlaying(true)); else { node.pause(); setPlaying(false); }
  }, []);
  const replay = useCallback(() => { const node = videoRef.current; if (node) { node.currentTime = 0; node.play(); setPlaying(true); } }, []);
  const onTime = useCallback(() => {
    const node = videoRef.current;
    if (!node?.duration) return;
    requestAnimationFrame(() => setProgress((node.currentTime / node.duration) * 100));
  }, []);

  return <article ref={shellRef} className={styles.player} aria-label={video.title}>
    {!ready && <div className={styles.spinner} aria-label="Video loading" />}
    <video ref={videoRef} poster={video.thumbnail} src={shouldLoad ? video.videoUrl : undefined} preload="none" playsInline muted={muted} loop onCanPlay={() => setReady(true)} onTimeUpdate={onTime} />
    <div className={styles.progress}><span style={{ width: `${progress}%` }} /></div>
    <div className={styles.controls}>
      <button onClick={togglePlay} aria-label={playing ? 'Pause video' : 'Play video'}>{playing ? 'Pause' : 'Play'}</button>
      <button onClick={() => setMuted((v) => !v)} aria-label={muted ? 'Unmute video' : 'Mute video'}>{muted ? 'Unmute' : 'Mute'}</button>
      <button onClick={replay} aria-label="Replay video">Replay</button>
    </div>
  </article>;
});
