import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
  const siteName = 'Ever After Events';
  const defaultDescription = 'Agence de wedding planning haut de gamme. Nous créons des mariages uniques et sans stress.';
  const defaultImage = '/images/og-image.jpg'; // Assurez-vous d'avoir une image og:image

  return (
    <Helmet>
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || 'https://votre-projet.netlify.app'} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default SEO;