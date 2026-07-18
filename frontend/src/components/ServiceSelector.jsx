import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ShoppingCart, Volume2, VolumeX } from 'lucide-react';
import servicesData from '../data/services.json'; // fichier JSON structuré

const ServiceSelector = () => {
  const [selectedAmbiance, setSelectedAmbiance] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (option) => {
    setWishlist((prev) => [...prev, option]);
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleSound = () => setSoundEnabled(!soundEnabled);

  const playAmbianceSound = (son) => {
    if (soundEnabled && son) {
      const audio = new Audio(son);
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-5xl font-serif text-center mb-12">Votre mariage sur mesure</h2>

      {/* Choix de l'ambiance */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {servicesData.ambiances.map((ambiance) => (
          <motion.div
            key={ambiance.id}
            onClick={() => {
              setSelectedAmbiance(ambiance.id);
              playAmbianceSound(ambiance.son);
            }}
            whileHover={{ scale: 1.03 }}
            className={`cursor-pointer p-4 rounded-xl border text-center transition-colors ${
              selectedAmbiance === ambiance.id
                ? 'border-champagne bg-champagne/10 shadow-lg'
                : 'border-gray-200 hover:border-champagne/50'
            }`}
          >
            <h3 className="font-serif text-lg">{ambiance.nom}</h3>
          </motion.div>
        ))}
        <button
          onClick={toggleSound}
          className="col-span-2 md:col-span-4 mx-auto mt-2 text-sm text-gray-500 flex items-center gap-1"
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          {soundEnabled ? 'Son activé' : 'Son désactivé'}
        </button>
      </div>

      {/* Catégories de services (si ambiance sélectionnée) */}
      {selectedAmbiance && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {servicesData.categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-champagne transition-colors text-center"
              whileHover={{ y: -4 }}
            >
              <div className="text-champagne mb-2">{/* icône */}</div>
              <h4 className="font-medium">{cat.nom}</h4>
            </motion.button>
          ))}
        </div>
      )}

      {/* Panneau latéral catégorie */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-20 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 p-6 overflow-y-auto"
          >
            <button onClick={() => setSelectedCategory(null)} className="absolute top-4 right-4 text-gray-500 hover:text-champagne">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-serif mb-4">{selectedCategory.nom}</h3>
            <video
              src={selectedCategory.video}
              poster={selectedCategory.image}
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-lg mb-4 aspect-video object-cover"
            />
            <p className="text-gray-600 mb-4">{selectedCategory.description}</p>
            <p className="text-lg font-semibold mb-4">À partir de {selectedCategory.prix_base} €</p>
            <h4 className="font-medium mb-2">Options :</h4>
            <ul className="space-y-2">
              {selectedCategory.options.map((opt) => (
                <li key={opt.id} className="flex justify-between items-center p-2 border rounded">
                  <span>{opt.nom} (+{opt.prix} €)</span>
                  <button
                    onClick={() => addToWishlist({ ...opt, category: selectedCategory.nom, id: `${selectedCategory.id}-${opt.nom}` })}
                    className="text-champagne hover:text-amber-700"
                  >
                    <ShoppingCart size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Carnet de rêve */}
      <div className="fixed top-24 right-4 z-40">
        <button
          onClick={() => setWishlistOpen(!wishlistOpen)}
          className="relative p-3 bg-champagne text-white rounded-full shadow-lg hover:bg-opacity-90 transition-colors"
        >
          <Heart size={24} />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-anthracite text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {wishlist.length}
            </span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {wishlistOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-20 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 p-6 overflow-y-auto"
          >
            <button onClick={() => setWishlistOpen(false)} className="absolute top-4 right-4"><X /></button>
            <h3 className="font-serif text-2xl mb-4">Mon carnet de rêve</h3>
            {wishlist.length === 0 ? (
              <p className="text-gray-500">Ajoutez des options à votre liste.</p>
            ) : (
              <ul className="space-y-3">
                {wishlist.map((item) => (
                  <li key={item.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <span className="font-medium">{item.nom}</span>
                      <span className="text-sm text-gray-500 ml-2">({item.category})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{item.prix} €</span>
                      <button onClick={() => removeFromWishlist(item.id)} className="text-red-500"><X size={14} /></button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {wishlist.length > 0 && (
              <button
                onClick={() => {
                  // Naviguer vers le simulateur avec les options (à implémenter)
                  window.location.href = '/simulateur';
                }}
                className="mt-6 w-full bg-champagne text-white py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
              >
                Estimer le budget
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServiceSelector;