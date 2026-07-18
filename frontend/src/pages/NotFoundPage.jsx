import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} className="relative mb-8 inline-flex items-center justify-center">
      <Heart className="text-blush w-24 h-24 md:w-32 md:h-32" strokeWidth={1} />
      <span className="absolute text-4xl md:text-6xl font-serif text-blush">404</span>
    </motion.div>
    <h1 className="text-5xl md:text-7xl font-serif mb-4 text-anthracite dark:text-gray-100">Oups...</h1>
    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">Cette page s’est évaporée comme un baiser volé sous la pluie. Mais l’amour, lui, est toujours là.</p>
    <Link to="/" className="inline-flex items-center gap-2 bg-blush text-white px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition-all shadow-xl">
      <ArrowLeft size={20} /> Retrouver le chemin du bonheur
    </Link>
  </div>
);

export default NotFoundPage;