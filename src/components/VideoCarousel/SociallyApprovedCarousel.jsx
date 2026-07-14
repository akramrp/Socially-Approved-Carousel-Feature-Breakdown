import { lazy, memo, Suspense, useCallback, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import styles from './VideoCarousel.module.css';

const VideoModal = lazy(() => import('./VideoModal.jsx'));

export const SociallyApprovedCarousel = memo(function SociallyApprovedCarousel({ videos, loading, activeId, onOpen, onClose }) {
  const [swiper, setSwiper] = useState(null);
  const [bounds, setBounds] = useState({ beginning: true, end: false });
  const activeIndex = useMemo(() => videos.findIndex((video) => video.id === activeId), [videos, activeId]);
  const hasActiveVideo = activeId !== null && activeIndex >= 0;

  const open = useCallback((id) => onOpen(id), [onOpen]);
  const syncBounds = useCallback((instance) => setBounds({ beginning: instance.isBeginning, end: instance.isEnd }), []);
  const movePrevious = useCallback(() => swiper?.slidePrev(), [swiper]);
  const moveNext = useCallback(() => swiper?.slideNext(), [swiper]);

  if (loading) return <div className={styles.skeletonGrid} aria-label="Loading videos" />;

  return <>
    <div className={styles.carouselShell} aria-label="Socially approved video thumbnails">
      <button className={`${styles.railArrow} ${styles.railArrowLeft}`} onClick={movePrevious} disabled={!swiper || bounds.beginning} aria-label="Previous carousel item">‹</button>
      <Swiper
        className={styles.outerCarousel}
        modules={[FreeMode, Keyboard]}
        freeMode
        keyboard={{ enabled: true }}
        slidesPerView="auto"
        slidesPerGroup={1}
        spaceBetween={16}
        passiveListeners
        watchSlidesProgress
        onSwiper={(instance) => { setSwiper(instance); syncBounds(instance); }}
        onSlideChange={syncBounds}
        onReachBeginning={syncBounds}
        onReachEnd={syncBounds}
        onResize={syncBounds}
      >
        {videos.map((video) => <SwiperSlide key={video.id} className={styles.thumbSlide}>
          <button className={styles.thumbButton} onClick={() => open(video.id)} aria-label={`Open ${video.title}`}>
            <img src={video.thumbnail} alt="" loading="lazy" decoding="async" />
            <span>{video.title}</span>
          </button>
        </SwiperSlide>)}
      </Swiper>
      <button className={`${styles.railArrow} ${styles.railArrowRight}`} onClick={moveNext} disabled={!swiper || bounds.end} aria-label="Next carousel item">›</button>
    </div>
    {hasActiveVideo ? <Suspense fallback={null}><VideoModal videos={videos} activeIndex={activeIndex} activeId={activeId} onClose={onClose} /></Suspense> : null}
  </>;
});
