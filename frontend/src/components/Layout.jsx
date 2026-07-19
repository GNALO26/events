import { lazy, Suspense, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import AudioPlayer from './AudioPlayer';

const IntroAnimation = lazy(() => import('./IntroAnimation'));

const pageVariants = {
  initial: { opacity: 0, filter: 'blur(8px)', scale: 0.98 },
  animate: { opacity: 1, filter: 'blur(0px)', scale: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  exit: { opacity: 0, filter: 'blur(4px)', scale: 0.96, transition: { duration: 0.3 } },
};

const Layout = () => {
  const [introDone, setIntroDone] = useState(false);
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-500">
      <Suspense fallback={null}>
        <IntroAnimation onFinish={() => setIntroDone(true)} />
      </Suspense>
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTopButton />
      <AudioPlayer />
    </div>
  );
};

export default Layout;