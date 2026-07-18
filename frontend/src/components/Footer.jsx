import { Link } from 'react-router-dom';
import { InstagramIcon, FacebookIcon, TikTokIcon } from './SocialIcons';

const Footer = () => {
  return (
    <footer className="bg-anthracite dark:bg-black text-cream dark:text-gray-200 py-12 mt-auto transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-serif text-xl font-bold mb-4 text-blush dark:text-gold">Ever After Events</h4>
          <p className="text-sm text-gray-300 dark:text-gray-400 leading-relaxed">
            Agence de wedding planning haut de gamme. Nous créons des mariages qui vous ressemblent, dans les moindres détails.
          </p>
        </div>
        <div>
          <h5 className="font-serif text-lg mb-4">Navigation</h5>
          <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
            <li><Link to="/" className="hover:text-blush dark:hover:text-gold transition-colors">Accueil</Link></li>
            <li><Link to="/agence" className="hover:text-blush dark:hover:text-gold transition-colors">L'Agence</Link></li>
            <li><Link to="/prestations" className="hover:text-blush dark:hover:text-gold transition-colors">Prestations</Link></li>
            <li><Link to="/portfolio" className="hover:text-blush dark:hover:text-gold transition-colors">Portfolio</Link></li>
            <li><a href="/#contact" className="hover:text-blush dark:hover:text-gold transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-serif text-lg mb-4">Suivez-nous</h5>
          <div className="flex space-x-5 text-gray-300 dark:text-gray-400">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blush dark:hover:text-gold transition-colors" aria-label="Instagram">
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-blush dark:hover:text-gold transition-colors" aria-label="TikTok">
              <TikTokIcon className="w-6 h-6" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blush dark:hover:text-gold transition-colors" aria-label="Facebook">
              <FacebookIcon className="w-6 h-6" />
            </a>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-6">
            © {new Date().getFullYear()} Ever After Events. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;