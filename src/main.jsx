import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { VideoProvider } from './context/VideoContext.jsx';

const App = lazy(() => import('./App.jsx'));

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VideoProvider>
      <Suspense fallback={<main className="page-shell">Loading experience…</main>}>
        <App />
      </Suspense>
    </VideoProvider>
  </React.StrictMode>,
);
