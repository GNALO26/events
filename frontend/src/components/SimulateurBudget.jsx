import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import { X, Share2 } from 'lucide-react';

const SimulateurBudget = ({ options, onClose }) => {
  const [invites, setInvites] = useState(100);
  const [saisonHaute, setSaisonHaute] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0);

  const basePrice = options.reduce((sum, opt) => sum + opt.prix, 0);
  const coeffInvites = invites > 100 ? (invites - 100) * 30 : 0;
  const total = (basePrice + coeffInvites) * (saisonHaute ? 1.2 : 1);

  const handleCalculate = () => {
    setShowResult(false);
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setShowResult(true);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
  };

  const shareLink = () => {
    const params = btoa(JSON.stringify({ options, invites, saisonHaute }));
    const url = `${window.location.origin}/simulateur?config=${params}`;
    navigator.clipboard.writeText(url).then(() => alert('Lien copié !'));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-champagne">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-serif mb-6 text-center">Simulateur de budget</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre d'invités : {invites}</label>
            <input
              type="range"
              min="50"
              max="300"
              value={invites}
              onChange={(e) => setInvites(Number(e.target.value))}
              className="w-full accent-champagne"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Saison haute (+20%)</label>
            <button
              onClick={() => setSaisonHaute(!saisonHaute)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                saisonHaute ? 'bg-champagne' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  saisonHaute ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <button
            onClick={handleCalculate}
            className="w-full bg-champagne text-white py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
          >
            Calculer la magie
          </button>
        </div>

        {progress > 0 && !showResult && (
          <div className="mt-6 flex flex-col items-center">
            <div className="w-24 h-24 mb-4">
              <CircularProgressbar
                value={progress}
                text={`${progress}%`}
                styles={buildStyles({
                  pathColor: '#D4AF37',
                  textColor: '#1A1A1A',
                })}
              />
            </div>
            <p className="text-gray-500 italic">Nous calculons la magie...</p>
          </div>
        )}

        {showResult && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-center">
            <p className="text-lg text-gray-600">Estimation totale</p>
            <p className="text-3xl font-bold text-champagne">{total.toLocaleString('fr-FR')} €</p>
            <p className="text-sm text-gray-500 mt-2">L'équivalent de {Math.round(total / 5)} roses éternelles</p>
            <button
              onClick={shareLink}
              className="mt-4 inline-flex items-center gap-2 text-champagne hover:underline text-sm"
            >
              <Share2 size={16} />
              Partager cette configuration
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SimulateurBudget;