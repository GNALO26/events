import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BackgroundVideo from '../components/BackgroundVideo';
import Countdown from '../components/Countdown';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import SEO from '../components/SEO';
import { ArrowRight, Check, Star, ChevronLeft, ChevronRight, Heart, Users, Calendar } from 'lucide-react';
import { HERO_VIDEO } from '../constants/videos';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: "easeOut" },
};

const stats = [
  { icon: <Heart size={32} />, value: 250, suffix: '+', label: 'Mariages organisés' },
  { icon: <Users size={32} />, value: 12, suffix: '', label: 'Années d\'expérience' },
  { icon: <Calendar size={32} />, value: 98, suffix: '%', label: 'Clients satisfaits' },
];

const testimonials = [
  {
    author: 'Chloé & Maxime',
    text: '"Confier notre mariage à Ever After Events a été la meilleure décision de notre vie. Éléonore a compris notre vision instantanément. Le jour J, nous étions de vrais invités à notre propre mariage. Zéro stress, que du bonheur pur."',
    photo: '/images/temoignages/couple1.jpg',
  },
  {
    author: 'Julien & Antoine',
    text: '"Professionnalisme, rigueur et créativité hors norme. La logistique de Thomas pour notre mariage à l’étranger était impeccable. Nos invités en parlent encore."',
    photo: '/images/temoignages/couple2.jpg',
  },
  {
    author: 'Sarah & Marc',
    text: '"Un rêve devenu réalité. L’équipe a su créer une ambiance magique dans notre bastide provençale. Merci infiniment."',
    photo: '/images/temoignages/couple1.jpg', // photo placeholder, à remplacer
  },
];

const HomePage = () => {
  const [formData, setFormData] = useState({
    nom: '', email: '', dateMariage: '', styleRecherche: '', message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [fireworksTrigger, setFireworksTrigger] = useState(false);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitStatus('success');
        setFireworksTrigger(true);
        setFormData({ nom: '', email: '', dateMariage: '', styleRecherche: '', message: '' });
        setTimeout(() => setFireworksTrigger(false), 2500);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  const Counter = ({ value, suffix }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, margin: "-50px" });
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (inView) {
        let start = 0, end = value, duration = 2000, increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        controls.start({ opacity: 1, y: 0 });
      }
    }, [inView, value, controls]);
    return (
      <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={controls} className="text-4xl font-bold text-blush">
        {count}{suffix}
      </motion.div>
    );
  };

  const nextTestimonial = () => setTestimonialIndex(prev => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);

  const aboutRef = useRef(null), servicesRef = useRef(null), testimonialsRef = useRef(null), contactRef = useRef(null);

  useGSAP(() => {
    gsap.from(aboutRef.current, { scrollTrigger: { trigger: aboutRef.current, start: 'top 80%' }, opacity: 0, y: 50, duration: 0.8 });
    gsap.from(servicesRef.current, { scrollTrigger: { trigger: servicesRef.current, start: 'top 80%' }, opacity: 0, y: 50, duration: 0.8 });
    gsap.from(testimonialsRef.current, { scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%' }, opacity: 0, y: 50, duration: 0.8 });
    gsap.from(contactRef.current, { scrollTrigger: { trigger: contactRef.current, start: 'top 80%' }, opacity: 0, y: 50, duration: 0.8 });
  }, []);

  return (
    <>
      <SEO title="Accueil" description="Ever After Events orchestre vos plus belles émotions..." />
      <div>
        {/* Hero */}
        <section className="relative min-h-[100svh] flex items-center">
          <BackgroundVideo videoSrc={HERO_VIDEO}>
            <div className="max-w-4xl mx-auto px-4 text-center text-white py-20 md:py-32">
              <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6">
                {["Le premier jour", "du reste de votre vie", "commence ici."].map((phrase, i) => (
                  <motion.span key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 + i * 0.4 }} className="block">
                    {phrase}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p className="text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                Ever After Events orchestre vos plus belles émotions. Nous transformons vos rêves de mariage en une réalité intemporelle et sans le moindre stress.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
                <a href="#contact" className="inline-flex items-center gap-2 bg-blush text-white px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg animate-pulse-slow">
                  Planifier notre grand jour <ArrowRight size={20} />
                </a>
              </motion.div>
            </div>
          </BackgroundVideo>
        </section>

        {/* Compteur */}
        <Countdown />

        {/* Statistiques */}
        <section className="py-16 bg-white border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div key={idx} className="flex flex-col items-center" {...fadeInUp} transition={{ delay: idx * 0.1 }}>
                <div className="text-blush mb-3">{stat.icon}</div>
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="text-gray-600 dark:text-gray-300 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* À propos + Slider Avant/Après */}
        <section ref={aboutRef} className="py-16 md:py-24 bg-cream dark:bg-anthracite">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-serif mb-8">L'Art de créer l'Inoubliable.</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10">
              Née d'une passion absolue pour l'élégance et le sens du détail, Ever After Events est une agence de wedding planning haut de gamme. Nous pensons que chaque mariage doit raconter une histoire unique : la vôtre.
            </p>
            <Link to="/agence" className="inline-flex items-center gap-2 border-2 border-blush text-blush hover:bg-blush hover:text-white px-6 py-3 rounded-full transition-all font-medium dark:border-gold dark:text-gold dark:hover:bg-gold dark:hover:text-anthracite">
              Découvrir notre histoire <ArrowRight size={18} />
            </Link>
            <div className="max-w-3xl mx-auto mt-12">
              <BeforeAfterSlider
                beforeSrc="/images/porfolio/chateau-villette.jpg"
                afterSrc="/images/porfolio/bastide-provence.jpg"
                beforeAlt="Lieu avant transformation"
                afterAlt="Lieu après transformation"
              />
            </div>
          </div>
        </section>

        {/* Services */}
        <section ref={servicesRef} className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-serif text-center mb-16">Nos Formules Clés en Main.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: "L'Organisation Absolue (De A à Z)", desc: "De la recherche du lieu idéal à la coordination du Jour J. Une sérénité totale." },
                { title: "La Coordination du Jour J", desc: "Vous avez les prestataires, nous gérons la partition le jour de l'événement." },
                { title: "Mariages Destination", desc: "Épousez-vous au bout du monde. Nous gérons la logistique internationale." },
              ].map((service, idx) => (
                <motion.div key={idx} className="p-8 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-xl transition-shadow text-center"
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.2 }}>
                  <Check className="mx-auto text-blush mb-4" size={32} />
                  <h3 className="font-serif text-2xl mb-4">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/prestations" className="inline-flex items-center gap-2 text-blush hover:underline font-medium dark:text-gold">
                Explorer nos prestations <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Témoignages avec photos et shimmer */}
        <section ref={testimonialsRef} className="py-16 md:py-24 bg-cream dark:bg-anthracite">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-serif mb-12">Ils nous ont confié leur plus beau jour.</h2>
            <div className="relative bg-white dark:bg-gray-800 p-10 rounded-xl shadow-md">
              <motion.div key={testimonialIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center">
                <img src={testimonials[testimonialIndex].photo} alt={testimonials[testimonialIndex].author} className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-blush" loading="lazy" />
                <Star className="text-blush mx-auto mb-4" size={32} fill="currentColor" />
                <p className="text-gray-700 dark:text-gray-300 italic text-lg mb-6">{testimonials[testimonialIndex].text}</p>
                <span className="relative inline-block font-bold text-gold italic text-2xl md:text-3xl font-serif">
                  <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-gold via-blush to-gold bg-[length:200%_100%] animate-shimmer">
                    {testimonials[testimonialIndex].author}
                  </span>
                  {testimonials[testimonialIndex].author}
                </span>
              </motion.div>
              <div className="flex justify-center mt-6 space-x-4">
                <button onClick={prevTestimonial} className="p-2 rounded-full border border-blush text-blush hover:bg-blush hover:text-white transition-colors"><ChevronLeft size={20} /></button>
                <button onClick={nextTestimonial} className="p-2 rounded-full border border-blush text-blush hover:bg-blush hover:text-white transition-colors"><ChevronRight size={20} /></button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section ref={contactRef} id="contact" className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-serif text-center mb-4">Commençons à écrire votre histoire.</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">Racontez-nous vos premières idées. Quelle est votre date idéale ? Quel style vous fait vibrer ? Notre équipe vous répond sous 48 heures.</p>
            <form onSubmit={handleSubmit} className="space-y-6 bg-cream dark:bg-anthracite p-6 md:p-8 rounded-xl shadow-sm relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium mb-1">Nom complet *</label>
                  <input type="text" name="nom" id="nom" required value={formData.nom} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blush focus:border-transparent outline-none dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blush focus:border-transparent outline-none dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="dateMariage" className="block text-sm font-medium mb-1">Date souhaitée</label>
                  <input type="text" name="dateMariage" id="dateMariage" placeholder="Ex: Juin 2026" value={formData.dateMariage} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blush focus:border-transparent outline-none dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="styleRecherche" className="block text-sm font-medium mb-1">Style recherché</label>
                  <select name="styleRecherche" id="styleRecherche" value={formData.styleRecherche} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blush focus:border-transparent outline-none">
                    <option value="">-- Choisissez --</option>
                    <option value="Château">Château & Prestige</option>
                    <option value="Bohème">Bohème & Nature</option>
                    <option value="Minimaliste">Minimaliste & Moderne</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Votre message</label>
                <textarea name="message" id="message" rows="5" value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blush focus:border-transparent outline-none dark:bg-gray-700 dark:text-white" placeholder="Parlez-nous de votre vision..."></textarea>
              </div>
              <button type="submit" disabled={submitStatus === 'loading'} className="w-full md:w-auto px-8 py-4 bg-blush text-white font-medium rounded-full hover:bg-opacity-90 transition-all disabled:opacity-70 relative">
                {submitStatus === 'loading' ? 'Envoi...' : 'Envoyer ma demande'}
              </button>
              {submitStatus === 'success' && <p className="text-green-500 mt-2">Message envoyé avec succès ! Nous revenons vers vous sous 48h.</p>}
              {submitStatus === 'error' && <p className="text-red-500 mt-2">Une erreur est survenue. Veuillez réessayer.</p>}
              {fireworksTrigger && <canvas className="absolute inset-0 pointer-events-none" />}
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;