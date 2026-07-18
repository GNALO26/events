import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.h1
        className="text-7xl font-serif text-champagne mb-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-xl text-gray-600 mb-8 max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Cette page s’est évaporée comme un souvenir de mariage sous la pluie.
      </motion.p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-champagne text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg"
      >
        <ArrowLeft size={18} />
        Retour à l’accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;