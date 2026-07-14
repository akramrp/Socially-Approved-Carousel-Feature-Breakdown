# Socially Approved Video Carousel

Production-oriented React + Express implementation of a high-performance video carousel inspired by Instagram Reels and socially approved travel sections.

## Architecture
- React functional components with memoization, lazy modal import, and Context-powered optimistic updates.
- Swiper.js outer thumbnail carousel keeps the browsing surface responsive for 30–40 items.
- Modal carousel renders only previous/current/next slides via a circular window, keeping active video elements low.
- Video sources use `preload="none"`, IntersectionObserver visibility, autoplay/pause, and teardown resource release on unmount.
- Express API serves a dummy JSON database and mutates like/share counts.

## Commands
```bash
npm install
npm run dev
npm run build
npm run lint
```

## API
- `GET /videos`
- `POST /like` with `{ "videoId": "video-1", "userId": "user-1" }`
- `POST /share` with `{ "videoId": "video-1", "platform": "native" }`
