import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const AgencePage = lazy(() => import('./pages/AgencePage'));
const PrestationsPage = lazy(() => import('./pages/PrestationsPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const RendezVousPage = lazy(() => import('./pages/RendezVousPage'));
const SimulateurPage = lazy(() => import('./pages/SimulateurPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-10 h-10 border-4 border-blush border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="agence" element={<AgencePage />} />
            <Route path="prestations" element={<PrestationsPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="rendez-vous" element={<RendezVousPage />} />
            <Route path="simulateur" element={<SimulateurPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;