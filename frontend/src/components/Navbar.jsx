import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { InstagramIcon, FacebookIcon, TikTokIcon } from './SocialIcons';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
      isActive
        ? 'text-blush border-b-2 border-blush dark:text-gold dark:border-gold'
        : 'text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold'
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-cream/90 dark:bg-anthracite/90 backdrop-blur-md shadow-sm transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        <Link
          to="/"
          className="text-2xl font-serif font-bold tracking-tight text-anthracite dark:text-gray-100 hover:text-blush dark:hover:text-gold transition-colors"
        >
          Ever After
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" end className={linkClasses}>
            Accueil
          </NavLink>
          <NavLink to="/agence" className={linkClasses}>
            Agence
          </NavLink>
          <NavLink to="/prestations" className={linkClasses}>
            Prestations
          </NavLink>
          <NavLink to="/portfolio" className={linkClasses}>
            Portfolio
          </NavLink>
          <a
            href="/#contact"
            className={`text-sm font-medium tracking-wider uppercase transition-colors duration-300 text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold`}
          >
            Contact
          </a>
          <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-gray-300 dark:border-gray-600">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-anthracite dark:text-gray-200"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden bg-cream dark:bg-anthracite border-t border-gray-200 dark:border-gray-700 px-4 py-6 space-y-4 transition-colors duration-300">
          <NavLink
            to="/"
            end
            onClick={() => setMobileOpen(false)}
            className="block text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold"
          >
            Accueil
          </NavLink>
          <NavLink
            to="/agence"
            onClick={() => setMobileOpen(false)}
            className="block text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold"
          >
            Agence
          </NavLink>
          <NavLink
            to="/prestations"
            onClick={() => setMobileOpen(false)}
            className="block text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold"
          >
            Prestations
          </NavLink>
          <NavLink
            to="/portfolio"
            onClick={() => setMobileOpen(false)}
            className="block text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold"
          >
            Portfolio
          </NavLink>
          <a
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="block text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold"
          >
            Contact
          </a>
          <div className="flex items-center space-x-6 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-anthracite dark:text-gray-200 hover:text-blush dark:hover:text-gold"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;