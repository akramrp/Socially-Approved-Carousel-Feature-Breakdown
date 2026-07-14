import { lazy, memo, Suspense, useCallback, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import styles from './VideoCarousel.module.css';

const VideoModal = lazy(() => import('./VideoModal.jsx'));

export const SociallyApprovedCarousel = memo(function SociallyApprovedCarousel({ videos, loading, activeId, onOpen, onClose }) {
  const activeIndex = useMemo(() => Math.max(0, videos.findIndex((video) => video.id === activeId)), [videos, activeId]);
  const open = useCallback((id) => onOpen(id), [onOpen]);
  if (loading) return <div className={styles.skeletonGrid} aria-label="Loading videos" />;
  return <>
    <Swiper className={styles.outerCarousel} modules={[FreeMode, Keyboard]} freeMode keyboard={{ enabled: true }} slidesPerView="auto" spaceBetween={16} passiveListeners watchSlidesProgress>
      {videos.map((video) => <SwiperSlide key={video.id} className={styles.thumbSlide}>
        <button className={styles.thumbButton} onClick={() => open(video.id)} aria-label={`Open ${video.title}`}>
          <img src={video.thumbnail} alt="" loading="lazy" decoding="async" />
          <span>{video.title}</span>
        </button>
      </SwiperSlide>)}
    </Swiper>
    {activeId ? <Suspense fallback={null}><VideoModal videos={videos} activeIndex={activeIndex} onClose={onClose} /></Suspense> : null}
  </>;
});
