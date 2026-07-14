# Socially Approved Video Carousel

Production-oriented React + Express implementation of a high-performance video carousel inspired by Instagram Reels and socially approved travel sections.

## Architecture
- React functional components with memoization, lazy modal import, and Context-powered optimistic updates.
- Swiper.js outer thumbnail carousel keeps the browsing surface responsive for 30–40 items.
- Modal carousel renders only previous/current/next slides via a circular window, keeping active video elements low.
- Video sources use `preload="none"`, IntersectionObserver visibility, autoplay/pause, and teardown resource release on unmount.
- Express API serves a dummy JSON database and mutates like/share counts.

## Local setup

### Prerequisites

- Node.js `20` or newer.
- npm, which ships with Node.js.
- Network access to the npm registry for the first dependency install.

Check your versions:

```bash
node --version
npm --version
```

### Install dependencies

From the cloned project root, run:

```bash
npm install
```

### Run frontend and backend together

```bash
npm run dev
```

This starts both processes:

- API server: `http://localhost:4000`
- Vite web app: the URL printed by Vite, usually `http://localhost:5173`

Open the Vite URL in your browser. The frontend reads videos from the Express API at `http://localhost:4000` by default.

### Run frontend and backend separately

Use two terminal windows if you prefer separate processes:

Terminal 1:

```bash
npm run dev:api
```

Terminal 2:

```bash
npm run dev:web
```

### Optional configuration

Create a local `.env` file only if your API is not running on port `4000`:

```bash
VITE_API_BASE_URL=http://localhost:4000
```

If you change the backend port, start the API with `PORT` and point Vite to the same URL:

```bash
PORT=5000 npm run dev:api
```

```bash
VITE_API_BASE_URL=http://localhost:5000 npm run dev:web
```

### Production build check

```bash
npm run build
npm run preview
```

### Lint check

```bash
=======
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

You can verify the backend directly after starting `npm run dev:api`:

```bash
curl http://localhost:4000/videos
```

## Troubleshooting

- If the web app shows `Unable to load videos.`, confirm the API is running and reachable at the configured `VITE_API_BASE_URL`.
- If port `4000` is already in use, run the API with another `PORT` and update `VITE_API_BASE_URL` accordingly.
- If install fails, clear your local npm cache with `npm cache verify`, confirm registry access with `npm config get registry`, and rerun `npm install`.

