import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

const CalendlyWidget = lazy(() => import('react-calendly'));

const RendezVousPage = () => {
  return (
    <div className="pt-8 pb-24">
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <motion.h1 className="text-4xl md:text-6xl font-serif mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          Prenons rendez-vous
        </motion.h1>
        <motion.p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Choisissez un créneau pour discuter de votre projet. Nous avons hâte de vous rencontrer.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-xl text-gray-500 dark:text-gray-400 italic mb-8">
          "Un créneau rien que pour vous, pour sceller votre conte de fées."
        </motion.p>
        <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-[700px] rounded-lg"></div>}>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <CalendlyWidget
              url="https://calendly.com/votre-lien"
              styles={{ height: '700px', minWidth: '320px' }}
              pageSettings={{
                backgroundColor: 'FAFAFA',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: 'D4A5A5',
                textColor: '1A1A1A',
              }}
            />
          </div>
        </Suspense>
      </section>
    </div>
  );
};

export default RendezVousPage;