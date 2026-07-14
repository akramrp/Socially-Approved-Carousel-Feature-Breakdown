import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { getCircularWindow } from '../../utils/windowing.js';
import { useVideos } from '../../context/VideoContext.jsx';
import { shareVideoLink } from '../../services/shareService.js';
import { VideoPlayer } from './VideoPlayer.jsx';
import styles from './VideoCarousel.module.css';

function VideoModal({ videos, activeIndex, onClose }) {
  const [index, setIndex] = useState(activeIndex);
  const { optimisticLike, recordShare } = useVideos();
  useEffect(() => setIndex(activeIndex), [activeIndex]);
  const windowedVideos = useMemo(() => getCircularWindow(videos, index, 1), [videos, index]);
  const move = useCallback((delta) => setIndex((current) => (current + delta + videos.length) % videos.length), [videos.length]);
  const onShare = useCallback(async (video) => { const platform = await shareVideoLink(video); recordShare(video.id, platform); }, [recordShare]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKey, { passive: true });
    return () => window.removeEventListener('keydown', onKey);
  }, [move, onClose]);

  return <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Socially approved video player">
    <button className={styles.close} onClick={onClose} aria-label="Close video carousel">×</button>
    <button className={styles.navPrev} onClick={() => move(-1)} aria-label="Previous video">‹</button>
    <div className={styles.modalTrack}>
      {windowedVideos.map(({ item, index: itemIndex }) => <section className={itemIndex === index ? styles.activePane : styles.sidePane} key={item.id}>
        <VideoPlayer video={item} active={itemIndex === index} />
        <div className={styles.meta}>
          <h2>{item.title}</h2><p>{item.description}</p>
          <button onClick={() => optimisticLike(item.id)}>♥ {item.likes}</button>
          <button onClick={() => onShare(item)}>Share {item.shares}</button>
        </div>
      </section>)}
    </div>
    <button className={styles.navNext} onClick={() => move(1)} aria-label="Next video">›</button>
  </div>;
}
export default memo(VideoModal);
