import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const PrestationsPage = () => {
  const services = [
    {
      title: "L'Organisation Absolue (De A à Z)",
      description: "La formule la plus complète pour un mariage entièrement imaginé et orchestré par nos soins.",
      deliverables: [
        "Recherche et sélection du lieu de réception",
        "Conception du design global et de la charte visuelle",
        "Gestion du budget avec suivi transparent",
        "Sélection et coordination de tous les prestataires (traiteur, fleuriste, photographe, orchestre, etc.)",
        "Création et envoi des faire-part et menus",
        "Coordination technique complète le Jour J",
        "Assistant(e) dédié(e) présent(e) toute la journée",
      ],
    },
    {
      title: "La Coordination du Jour J",
      description: "Vous avez déjà sélectionné vos prestataires ? Nous prenons le relais pour que tout s'emboîte parfaitement.",
      deliverables: [
        "Prise de contact avec chaque prestataire en amont",
        "Élaboration du planning horaire détaillé",
        "Supervision de l'installation et des répétitions",
        "Gestion des imprévus en temps réel",
        "Point de contact unique pour tous les intervenants",
        "Présence d'un coordinateur du début à la fin de l'événement",
      ],
    },
    {
      title: "Mariages Destination",
      description: "Dire 'oui' à l'autre bout du monde, sans le stress des kilomètres.",
      deliverables: [
        "Recherche de destination et de lieu selon vos envies",
        "Gestion des contraintes légales et administratives locales",
        "Organisation du transport et de l'hébergement pour les invités",
        "Coordination avec des prestataires internationaux",
        "Assistance logistique multilingue",
        "Reconnaissance sur site en amont",
      ],
    },
  ];

  return (
    <div className="pt-8 pb-24">
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <motion.h1 className="text-4xl md:text-6xl font-serif mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          Des Services Conçus Pour Votre Sérénité.
        </motion.h1>
        <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Chaque formule est pensée pour s'adapter à vos besoins, de la simple coordination au projet le plus ambitieux.
        </motion.p>
      </section>

      <div className="max-w-5xl mx-auto px-4 space-y-20">
        {services.map((service, index) => (
          <motion.div key={index} className="bg-white shadow-lg rounded-xl p-8 md:p-12" {...fadeInUp} transition={{ delay: index * 0.2 }}>
            <h3 className="text-2xl md:text-3xl font-serif mb-3">{service.title}</h3>
            <p className="text-gray-600 mb-8">{service.description}</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="text-champagne flex-shrink-0 mt-1" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PrestationsPage;