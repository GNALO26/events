import { motion } from 'framer-motion';
import { Heart, Cog } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8 },
};

const AgencePage = () => {
  return (
    <div className="pt-8 pb-24">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <motion.h1 className="text-4xl md:text-6xl font-serif mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Derrière la Magie, une Équipe Dévouée.
        </motion.h1>
        <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          L'Excellence dans chaque détail. Un mariage réussi ne se limite pas à une belle décoration. C’est une chorégraphie invisible où le traiteur, la lumière, la musique et le timing s’unissent pour créer une atmosphère suspendue dans le temps.
        </motion.p>
      </section>

      {/* Équipe */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
        <motion.div className="text-center md:text-left" {...fadeInUp}>
          <div className="flex justify-center md:justify-start mb-6">
            <Heart className="text-champagne" size={40} />
          </div>
          <h3 className="text-2xl font-serif mb-3">Éléonore Caron</h3>
          <p className="text-sm uppercase tracking-widest text-champagne mb-4">Fondatrice & Directrice Artistique</p>
          <p className="text-gray-700 leading-relaxed">
            Ma mission est de capter votre essence pour la traduire en une scénographie visuelle unique. Chaque détail compte, de la nuance des fleurs jusqu'au choix du papier à lettre.
          </p>
        </motion.div>

        <motion.div className="text-center md:text-left" {...fadeInUp} transition={{ delay: 0.2 }}>
          <div className="flex justify-center md:justify-start mb-6">
            <Cog className="text-champagne" size={40} />
          </div>
          <h3 className="text-2xl font-serif mb-3">Thomas Valois</h3>
          <p className="text-sm uppercase tracking-widest text-champagne mb-4">Directeur Logistique & Technique</p>
          <p className="text-gray-700 leading-relaxed">
            Aucun défi technique ne me résiste. Si vous imaginez une piste de danse flottante sur une piscine, je la construis. Votre sérénité repose sur une logistique infaillible.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default AgencePage;