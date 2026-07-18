import { motion } from 'framer-motion';
import SimulateurBudget from '../components/SimulateurBudget';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SimulateurPage = () => {
  const [options, setOptions] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Récupération des options depuis le localStorage (carnet de rêve) ou depuis l'URL partagée
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      setOptions(JSON.parse(saved));
    } else {
      const config = searchParams.get('config');
      if (config) {
        try {
          const decoded = JSON.parse(atob(config));
          setOptions(decoded.options || []);
        } catch (e) {
          console.error('Paramètre de configuration invalide');
        }
      }
    }
  }, [searchParams]);

  return (
    <div className="pt-8 pb-24 min-h-screen flex items-center justify-center bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto px-4 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-serif mb-12">Simulateur de budget</h1>
        {options.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <p className="text-gray-600 text-lg mb-4">Aucune option sélectionnée.</p>
            <p className="text-gray-500">
              Ajoutez des services depuis la page <a href="/prestations" className="text-champagne hover:underline">Prestations</a> pour estimer votre budget.
            </p>
          </div>
        ) : (
          <SimulateurBudget options={options} onClose={() => {}} embedded />
        )}
      </motion.div>
    </div>
  );
};

export default SimulateurPage;