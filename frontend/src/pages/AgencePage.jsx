import { motion } from 'framer-motion';
import { Heart, Cog, Target, Eye, Compass } from 'lucide-react';
import AnimatedSignature from '../components/AnimatedSignature';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8 },
};

const values = [
  { icon: <Target size={36} />, title: 'Excellence', desc: 'Chaque détail est minutieusement orchestré.' },
  { icon: <Eye size={36} />, title: 'Créativité', desc: 'Des concepts uniques qui vous ressemblent.' },
  { icon: <Compass size={36} />, title: 'Sérénité', desc: 'Nous gérons l’imprévu, vous profitez.' },
];

const timeline = [
  { year: '2012', event: 'Fondation de l’agence par Éléonore Caron.' },
  { year: '2015', event: 'Premier mariage à l’étranger (Italie).' },
  { year: '2018', event: 'Lancement de la formule Destination.' },
  { year: '2021', event: 'Thomas Valois rejoint l’équipe.' },
  { year: '2024', event: 'Plus de 250 mariages réalisés.' },
];

const AgencePage = () => {
  return (
    <div className="pt-8 pb-24">
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <motion.h1 className="text-4xl md:text-6xl font-serif mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          Derrière la Magie, une Équipe Dévouée.
        </motion.h1>
        <motion.p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          L'Excellence dans chaque détail. Un mariage réussi ne se limite pas à une belle décoration.
        </motion.p>
      </section>

      {/* Valeurs */}
      <section className="py-16 bg-cream dark:bg-anthracite">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 className="text-3xl font-serif text-center mb-12" {...fadeInUp}>Nos Valeurs</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((val, idx) => (
              <motion.div key={idx} className="text-center p-6" {...fadeInUp} transition={{ delay: idx * 0.2 }}>
                <div className="text-blush dark:text-gold flex justify-center mb-4">{val.icon}</div>
                <h3 className="text-xl font-serif mb-2">{val.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2 className="text-3xl font-serif text-center mb-12" {...fadeInUp}>Notre Histoire</motion.h2>
          <div className="relative border-l-2 border-blush dark:border-gold">
            {timeline.map((item, idx) => (
              <motion.div key={idx} className="mb-10 ml-6" {...fadeInUp} transition={{ delay: idx * 0.1 }}>
                <span className="absolute w-4 h-4 bg-blush dark:bg-gold rounded-full -left-2 mt-1.5 border-2 border-white dark:border-gray-900" />
                <h3 className="text-lg font-bold text-blush dark:text-gold">{item.year}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
        <motion.div className="text-center md:text-left" {...fadeInUp}>
          <img src="/images/equipe/eleonore.jpg" alt="Éléonore Caron" className="w-40 h-40 rounded-full object-cover mx-auto md:mx-0 border-4 border-blush dark:border-gold mb-6" loading="lazy" />
          <h3 className="text-2xl font-serif mb-1">Éléonore Caron</h3>
          <p className="text-sm uppercase tracking-widest text-blush dark:text-gold mb-4">Fondatrice & Directrice Artistique</p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Ma mission est de capter votre essence pour la traduire en une scénographie visuelle unique.</p>
          <AnimatedSignature className="mt-4" pathData="M20,70 Q50,30 100,60 T180,50 T280,70" />
        </motion.div>
        <motion.div className="text-center md:text-left" {...fadeInUp} transition={{ delay: 0.2 }}>
          <img src="/images/equipe/thomas.jpg" alt="Thomas Valois" className="w-40 h-40 rounded-full object-cover mx-auto md:mx-0 border-4 border-blush dark:border-gold mb-6" loading="lazy" />
          <h3 className="text-2xl font-serif mb-1">Thomas Valois</h3>
          <p className="text-sm uppercase tracking-widest text-blush dark:text-gold mb-4">Directeur Logistique & Technique</p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Aucun défi technique ne me résiste. Si vous imaginez une piste de danse flottante, je la construis.</p>
          <AnimatedSignature className="mt-4" pathData="M10,80 Q60,20 120,50 T220,40 T350,70" />
        </motion.div>
      </section>

      <motion.div className="max-w-3xl mx-auto text-center py-12 px-4" {...fadeInUp}>
        <p className="text-2xl font-serif italic text-gray-500 dark:text-gray-400">"L’amour est un voyage, notre mission est d’en faire une destination inoubliable."</p>
        <p className="mt-4 text-blush dark:text-gold font-semibold">— Éléonore Caron</p>
      </motion.div>
    </div>
  );
};

export default AgencePage;