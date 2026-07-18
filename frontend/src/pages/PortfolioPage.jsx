import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../components/Modal';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { PORTFOLIO_VIDEOS } from '../constants/videos';

const projects = [
  {
    id: 1,
    title: 'Château de Villette',
    category: 'Château & Prestige',
    image: '/images/porfolio/chateau-villette.jpg',
    video: PORTFOLIO_VIDEOS['Château de Villette'],
  },
  {
    id: 2,
    title: 'Bastide en Provence',
    category: 'Bohème & Nature',
    image: '/images/porfolio/bastide-provence.jpg',
    video: PORTFOLIO_VIDEOS['Bastide en Provence'],
  },
  {
    id: 3,
    title: 'Mariage Urbain',
    category: 'Minimaliste & Moderne',
    image: '/images/porfolio/mariage-urbain.jpg',
    video: PORTFOLIO_VIDEOS['Mariage Urbain'],
  },
  {
    id: 4,
    title: 'Domaine de Chantilly',
    category: 'Château & Prestige',
    image: '/images/porfolio/chantilly.jpg',
    video: PORTFOLIO_VIDEOS['Domaine de Chantilly'],
  },
  {
    id: 5,
    title: 'Cérémonie en Forêt',
    category: 'Bohème & Nature',
    image: '/images/porfolio/foret.jpg',
    video: PORTFOLIO_VIDEOS['Cérémonie en Forêt'],
  },
  {
    id: 6,
    title: 'Loft New-Yorkais',
    category: 'Minimaliste & Moderne',
    image: '/images/porfolio/loft-ny.jpg',
    video: PORTFOLIO_VIDEOS['Loft New-Yorkais'],
  },
];

const categories = ['Tous', 'Château & Prestige', 'Bohème & Nature', 'Minimaliste & Moderne'];

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = activeCategory === 'Tous' ? projects : projects.filter(p => p.category === activeCategory);

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);
  const goToPrevious = () => setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
  const goToNext = () => setSelectedIndex(prev => (prev + 1) % filtered.length);

  const selectedProject = selectedIndex !== null ? filtered[selectedIndex] : null;

  return (
    <div className="pt-8 pb-24">
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <motion.h1 className="text-4xl md:text-6xl font-serif mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          Histoires d'Amour Romantiques & Authentiques.
        </motion.h1>
        <motion.p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Découvrez quelques-unes de nos plus belles réalisations.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setSelectedIndex(null); }}
              className={`px-6 py-2 rounded-full border transition-all ${activeCategory === cat ? 'bg-blush text-white border-blush dark:bg-gold dark:text-anthracite' : 'bg-transparent text-anthracite dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:border-blush hover:text-blush dark:hover:border-gold dark:hover:text-gold'}`}>
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
              className="relative group overflow-hidden rounded-xl cursor-pointer shadow-lg"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => openModal(index)}>
              {hoveredId === project.id ? (
                <video src={project.video} autoPlay muted loop playsInline className="w-full h-48 sm:h-72 object-cover" />
              ) : (
                <img src={project.image} alt={project.title} className="w-full h-48 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="text-white" size={48} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white font-serif text-xl">{project.title}</h3>
                <p className="text-gray-200 text-sm">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Modal isOpen={selectedIndex !== null} onClose={closeModal}>
        {selectedProject && (
          <div className="relative aspect-video bg-black rounded-t-lg">
            <video src={selectedProject.video} className="w-full h-full object-contain" autoPlay loop muted playsInline controls />
            <button onClick={(e) => { e.stopPropagation(); goToPrevious(); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm"><ChevronLeft size={28} /></button>
            <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 backdrop-blur-sm"><ChevronRight size={28} /></button>
          </div>
        )}
        {selectedProject && (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-b-lg">
            <h3 className="text-2xl font-serif mb-1">{selectedProject.title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{selectedProject.category}</p>
            <p className="mt-4 italic text-gray-600 dark:text-gray-300">"Un moment suspendu hors du temps, merci à toute l'équipe."</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PortfolioPage;