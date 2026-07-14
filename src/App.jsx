import { useCallback, useState } from 'react';
import { SociallyApprovedCarousel } from './components/VideoCarousel/SociallyApprovedCarousel.jsx';
import { useVideos } from './context/VideoContext.jsx';

export default function App() {
  const { videos, loading, error } = useVideos();
  const [activeId, setActiveId] = useState(null);
  const onClose = useCallback(() => setActiveId(null), []);

  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="socially-approved-title">
        <p className="eyebrow">Social proof in motion</p>
        <h1 id="socially-approved-title">Socially Approved</h1>
        <p className="lede">A production-style Reels carousel that keeps video memory low while preserving fast swipe interactions.</p>
      </section>
      {error ? <p role="alert" className="error">{error}</p> : null}
      <SociallyApprovedCarousel videos={videos} loading={loading} activeId={activeId} onOpen={setActiveId} onClose={onClose} />
    </main>
  );
}
