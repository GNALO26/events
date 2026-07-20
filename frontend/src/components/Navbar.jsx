import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { InstagramIcon, FacebookIcon, TikTokIcon } from './SocialIcons';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `text-lg font-medium tracking-wider uppercase transition-colors duration-300 block py-3 ${
      isActive
        ? 'text-blush border-r-4 border-blush pr-4 dark:text-gold dark:border-gold'
        : 'text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold'
    }`;

  const handleLinkClick = () => setSidebarOpen(false);

  const navLinks = (
    <>
      <NavLink to="/" end className={linkClasses} onClick={handleLinkClick}>Accueil</NavLink>
      <NavLink to="/agence" className={linkClasses} onClick={handleLinkClick}>Agence</NavLink>
      <NavLink to="/prestations" className={linkClasses} onClick={handleLinkClick}>Prestations</NavLink>
      <NavLink to="/portfolio" className={linkClasses} onClick={handleLinkClick}>Portfolio</NavLink>
      <a href="/#contact" className={`text-lg font-medium tracking-wider uppercase transition-colors duration-300 block py-3 text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold`} onClick={handleLinkClick}>Contact</a>
    </>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-cream dark:bg-anthracite shadow-sm transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 md:h-20">
        <Link to="/" className="text-xl md:text-2xl font-serif font-bold tracking-tight text-anthracite dark:text-gray-100 hover:text-blush dark:hover:text-gold transition-colors">
          Event After
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks}
        </nav>

        {/* Icônes sociales + thème (desktop) */}
        <div className="hidden md:flex items-center space-x-4 ml-4 border-l pl-4 border-gray-300 dark:border-gray-600">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold transition-colors" aria-label="Instagram"><InstagramIcon /></a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold transition-colors" aria-label="TikTok"><TikTokIcon /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold transition-colors" aria-label="Facebook"><FacebookIcon /></a>
          <ThemeToggle />
        </div>

        {/* Bouton hamburger (mobile) */}
        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-anthracite dark:text-gray-200 p-2" aria-label="Ouvrir le menu">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed top-0 right-0 h-full w-72 bg-cream dark:bg-anthracite shadow-2xl z-50 flex flex-col p-6 md:hidden">
              <button autoFocus onClick={() => setSidebarOpen(false)} className="self-end mb-6 text-anthracite dark:text-gray-200 p-2" aria-label="Fermer le menu"><X size={24} /></button>
              <nav className="flex flex-col space-y-1">{navLinks}</nav>
              <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold transition-colors"><InstagramIcon className="w-6 h-6" /></a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold transition-colors"><TikTokIcon className="w-6 h-6" /></a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold transition-colors"><FacebookIcon className="w-6 h-6" /></a>
                </div>
                <ThemeToggle />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;